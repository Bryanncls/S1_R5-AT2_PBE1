const express = require("express")
const fs = require("fs")
const app = express()
const PORT = 8081

app.use(express.json())

app.post("/usuarios/novo", (req, res) => {
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos" })
    }

    let novoUsuario = { nome: nome, email: email, senha: senha }

    fs.readFile("usuarios.json", "utf8", (erro, dados) => {
        let usuarios = []
        
        if (!erro) {
            try {
                usuarios = JSON.parse(dados)
            } catch (e) {
                usuarios = []
            }
        }

        usuarios.push(novoUsuario)

        fs.writeFile("usuarios.json", JSON.stringify(usuarios), (erro) => {
            if (erro) {
                return res.status(500).json({ erro: "Erro ao salvar usuário" })
            }
            res.status(201).json({ mensagem: "Usuário cadastrado", usuario: novoUsuario })
        })
    })
})

// sempre ultima linha
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
