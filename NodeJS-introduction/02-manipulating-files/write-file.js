const fs = require('node:fs')

try {
  fs.writeFileSync("./arquivo.txt", "Hello, world!", "utf-8")
  console.log("File cretaed succesfuly.")
} catch (error) {
  console.log("Error by writing file: ", error.message)
}