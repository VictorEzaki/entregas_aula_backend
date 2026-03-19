const express = require('express');
const Expense = require('./src/models/expense.js');

const app = express();

app.use(express.json());

cont = 0;

app.post('/despesa/novo', (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;
    
        if (!title) {
            return res.status(400).send("O título da despeasa é obrigatório");
        }
    
        const expense = Expense.create(title, amount, category, date, description);

        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({
            erro: error
        })
    }
    
})

// app.get('/expense', (req, res) => {
//     const users = Expense.getAll();

//     res.status(200).json(users);
// })
// app.get('/expense/:id', (req, res) => {
//     const user = Expense.getById(Number(req.params.id));

//     res.status(200).json(user);
// })
// app.post('/expense', (req, res) => {
//     const { email, password, name } = req.body

//     const user = Expense.create(email, password, name);

//     res.status(201).json(user);
// })
// app.put('/expense/:id', (req, res) => {
//     const { email, password, name } = req.body

//     const user = Expense.update(
//         Number(req.params.id),
//         email,
//         password,
//         name
//     );

//     res.status(200).json(user);
// })
// app.delete('/expense/:id', (req, res) => {
//     Expense.delete(Number(req.params.id));

//     res.status(204).json();
// })

app.listen(1080, () => {
    console.info(`Servidor rodando na porta ${1080}`);
})