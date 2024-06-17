const process = require("process");

console.log("digite seu nome")

process.stdin.on("data", function (keyboard)  {
        process.stdout.write ('Texto do usuário:' ${keyboard});
        process.exit();
})