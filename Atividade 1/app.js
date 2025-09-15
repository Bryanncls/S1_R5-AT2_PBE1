const express = require("express")
const app = express()
const PORT = 8081

app.use(express.json());

app.post("/usuarios/novo", (req, res) => {
    let { nome, email, senha } = req.body;

    if (!nome || nome.length < 3) {
        return res.status(400).json({ erro: "Nome deve ter no mínimo 4 caracteres" });
    }
    if (!email || !email.includes("@")) {
        return res.status(400).json({ erro: "Email inválido" });
    }
    if (!senha || senha.length < 4) {
        return res.status(400).json({ erro: "Senha deve ter no mínimo 4 caracteres" });
    }

    let novoUsuario = { nome, email, senha };

    fs.readFile("usuarios.json", "utf8", (error, data) => {
        let usuarios = [];
        if (!error) {
            usuarios = JSON.parse(data);
        }
        usuarios.push(novoUsuario);
        fs.writeFile("usuarios.json", JSON.stringify(usuarios, null, 2), (error) => {
            if (error) return res.status(500).json({ erro: "Erro ao salvar usuário" });
            res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", usuario: novoUsuario });
        });
    });
});

// sempre ultima linha
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})