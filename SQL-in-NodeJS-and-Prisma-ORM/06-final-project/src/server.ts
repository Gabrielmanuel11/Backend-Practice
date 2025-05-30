import cors from "cors"
import express from "express"
import { router } from "./router"
import {errorHandlerMiddleware} from "./middleware/error-handler"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT,() => console.log(`Server started on <http://localhost:${PORT}/`))