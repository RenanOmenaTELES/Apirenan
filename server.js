const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear o corpo da requisição como JSON
app.use(express.json());

// "Base de dados" em memória (vetor de produtos)
let produtos = [
    { id: 1, nome: "Produto A", quantidade: 10, preco: 100.0 },
    { id: 2, nome: "Produto B", quantidade: 20, preco: 150.0 },
];

// Rota para consultar todos os produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Rota para consultar um produto pelo ID
app.get('/produto/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Rota para inserir um novo produto
app.post('/produto', (req, res) => {
    const { id, nome, quantidade, preco } = req.body;

    if (!id || !nome || quantidade === undefined || preco === undefined) {
        return res.status(400).json({ message: 'Dados incompletos' });
    }

    const novoProduto = { id, nome, quantidade, preco };
    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// Rota para alterar os dados de um produto
app.put('/produto/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, quantidade, preco } = req.body;

    const produto = produtos.find(p => p.id === id);

    if (produto) {
        produto.nome = nome || produto.nome;
        produto.quantidade = quantidade || produto.quantidade;
        produto.preco = preco || produto.preco;

        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Rota para deletar um produto
app.delete('/produto/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index !== -1) {
        produtos.splice(index, 1);
        res.json({ message: 'Produto deletado com sucesso' });
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Iniciar o servidor na porta 3000
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
