import { Handler } from "express";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRpository";

export class LeadsController {
  private leadsRepository: LeadsRepository

  constructor(leadsRepository: LeadsRepository) {
    this.leadsRepository = leadsRepository
  }

  index: Handler = async (req, res, next) => {
    try {
      const query = GetLeadsRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query
      const limit = Number(pageSize)
      const offset = (Number(page) - 1) * limit

      const where: LeadWhereParams = {}
      if (name) where.name = { like: name, mode: "insensitive" }
      if (status) where.status = status

      const leads = await this.leadsRepository.find({ where, sortBy, order, limit, offset })
      const total = await this.leadsRepository.count(where)

      // const leads = await prisma.lead.findMany({
      //   where,
      //   skip: (pageNumber - 1) * pageSizeNumber,
      //   take: pageSizeNumber,
      //   orderBy: { [sortBy]: order }
      // })

      // const total = await prisma.lead.count({ where })

      res.json({
        data: leads,
        meta: {
          page: Number(page),
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      next(error)
    }
  }

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateLeadRequestSchema.parse(req.body)
      if (!body.status) body.status = "New"
      const newLead = await this.leadsRepository.create(body)
      // const newLead = await prisma.lead.create({
      //   data: body
      // })
      res.status(201).json(newLead)
    } catch (error) {
      next(error)
    }
  }

  show: Handler = async (req, res, next) => {
    try {
      const lead = await this.leadsRepository.findById(Number(req.params.id))
      // const lead = await prisma.lead.findUnique({
      //   where: { id: Number(req.params.id) },
      //   include: {
      //     groups: true,
      //     campaigns: true
      //   }
      // })

      if (!lead) throw new HttpError(404, "Lead not found")

      res.json(lead)
    } catch (error) {
      next(error)
    }
  }

  update: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const body = UpdateLeadRequestSchema.parse(req.body)

      const lead = await this.leadsRepository.findById(id)
      // const lead = await prisma.lead.findUnique({ where: { id } })
      if (!lead) throw new HttpError(404, "Lead not found")

      if (lead.status === "New" && body.status !== undefined && body.status !== "Contacted") {
        throw new HttpError(400, "um novo lead deve ser contatado antes de ter seu status atualizado para outros valores")
      }

      if (body.status && body.status === "Archived") {
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays < 180) throw new HttpError(400, "um lead só pode ser arquivado após 6 meses de inatividade")
      }

      const updatedLead = await this.leadsRepository.updateById(id, body)
      // const updatedLead = await prisma.lead.update({ data: body, where: { id } })

      res.json(updatedLead)
    } catch (error) {
      next(error)
    }
  }

  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id)

      const leadExists = await this.leadsRepository.findById(id)
      // const leadExists = await prisma.lead.findUnique({ where: { id } })
      if (!leadExists) throw new HttpError(404, "Lead not found")

      const deletedLead = await this.leadsRepository.deleteById(id)
      // const deletedLead = await prisma.lead.delete({ where: { id } })

      res.json({ deletedLead })
    } catch (error) {
      next(error)
    }
  }
}