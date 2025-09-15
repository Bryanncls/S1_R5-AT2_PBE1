const express = require("express");
const app = express();
const PORT = 8081;

app.use(express.json());

app.post("/soma", (req, res) => {
    const valores = req.body.valores;

    if (!Array.isArray(valores)) {
        return res.status(400).json({ erro: "O campo 'valores' precisa ser uma lista" });
    }

    const numerosValidos = [];
    let ignorados = 0;

    for (let i = 0; i < valores.length; i++) {
        if (!isNaN(valores[i])) {
            numerosValidos.push(Number(valores[i]));
        } else {
            ignorados++;
        }
    }

    if (numerosValidos.length === 0) {
        return res.status(400).json({ erro: "Nenhum número válido encontrado" });
    }

    const soma = numerosValidos.reduce(function(acumulador, valorAtual) {
        return acumulador + valorAtual;
    }, 0);

    res.json({ soma, ignorados });
});

// sempre ultima linha
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
