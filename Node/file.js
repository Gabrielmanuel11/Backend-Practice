const fs = require ('fs');
const { default: test } = require('node:test');

/*fs.writeFile('test.txt','Estou criando um arquvio', err => {
    console.log(err)
})*///Cria um arquivo pelo servidor e sobresecreve arquivos

/*fs.appendFile('test.txt','Estou criando um arquvio', err => {
    console.log(err)
})*///Adiciona info ao arquivo criado

fs.rename('test.txt','test.txt2', err => console.log(err));