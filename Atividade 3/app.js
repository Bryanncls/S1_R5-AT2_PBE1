const express = require("express");
const app = express();
const PORT = 8081;

app.use(express.json());

app.post("/soma", (req, res) => {
    const valores = [req.body.a, req.body.b, req.body.c];

    for (let i = 0; i < valores.length; i++) {
        if (isNaN(valores[i])) {
            return res.status(400).send("Erro: todos os valores devem ser números.");
        }
    }

    const total = valores.reduce((acumulador, valor) => acumulador + Number(valor), 0);

    res.send(`Resultado da soma: ${total}`);
});


// sempre ultima linha
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
