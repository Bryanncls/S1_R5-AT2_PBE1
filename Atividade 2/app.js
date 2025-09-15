const express = require("express")
const app = express()
const PORT = 8081

app.post("/alunos/notas", (req, res) => {
    let { nome, notas } = req.body;

    if (!nome || !notas || !Array.isArray(notas)) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    let soma = 0;
    let quantidade = 0;

    for (let i = 0; i < notas.length; i++) {
        if (!isNaN(notas[i])) {
            soma += Number(notas[i]); // garante que seja número
            quantidade++;
        }
    }

    if (quantidade === 0) return res.status(400).json({ erro: "Nenhuma nota válida" });

    let media = soma / quantidade;
    let situacao = media > 6 ? "APROVADO" : "REPROVADO";

    res.json({ nome, media, situacao });
});

// sempre ultima linha
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})