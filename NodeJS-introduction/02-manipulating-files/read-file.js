const fs = require('node:fs')

try {
  const data = fs.readFileSync("./file.txt", "utf-8")
  console.log(data)
} catch (error) {
  console.log("Error by reading file: ", error.message)
}