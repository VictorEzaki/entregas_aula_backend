const express = require("express");
const Expense = require("./models/expense.js");

const app = express();

app.use(express.json());

app.post("/expenses", (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    // verifica se o title foi enviado ou se está com o tipo correto
    if (title !== undefined && typeof title !== "string") {
      return res.status(400).send({
        erro: "Título de despesa inválido.",
      });
    }

    // verifica se amount é number caso tenha sido enviado
    if (amount !== undefined && typeof amount !== "number") {
      return res.status(400).send({
        erro: "Valor de despesa inválido.",
      });
    }

    // verifica se categoria foi enviado no tipo correto
    if (category !== undefined && typeof category !== "string") {
      return res.status(400).send({
        erro: "Categoria inválida.",
      });
    }

    // verifica se é uma data válida quando enviada
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (date !== undefined && !dateRegex.test(date)) {
      return res.status(400).send({
        erro: "Formato de data inválido. Use YYYY-MM-DD.",
      });
    }

    // verifica se foi enviado com o tipo correto(string)
    if (description !== undefined && typeof description !== "string") {
      return res.status(400).send({
        erro: "Descrição de despesa ausente ou inválido.",
      });
    }

    const expense = Expense.create(title, amount, category, date, description);

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
});

app.get("/expenses", (req, res) => {
  try {
    const { category } = req.query;
    let { date } = req.query;

    let expenses = Expense.getAll();
    if (category) {
      expenses = expenses.filter(
        (expense) => expense.category.toLowerCase() === category.toLowerCase(),
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (date !== undefined && !dateRegex.test(date)) {
      return res.status(400).send({
        erro: "Formato de data inválido. Use YYYY-MM-DD.",
      });
    }
    if (date) {
      expenses = expenses.filter((expense) => expense.date === date);
    }

    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
});

app.get("/expenses/:id", (req, res) => {
  try {
    const { id } = req.params;

    const expense = Expense.getById(Number(id));
    if (!expense) {
      return res.status(404).send({
        erro: "Despesa não encontrada.",
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
});

app.put("/expenses/:id", (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;
    const { id } = req.params;
    // verifica se o title foi enviado ou se está com o tipo correto
    if (title !== undefined && typeof title !== "string") {
      return res.status(400).send({
        erro: "Título de despesa inválido.",
      });
    }

    // verifica se amount é number caso tenha sido enviado
    if (amount !== undefined && typeof amount !== "number") {
      return res.status(400).send({
        erro: "Valor de despesa inválido.",
      });
    }

    // verifica se categoria foi enviado no tipo correto
    if (category !== undefined && typeof category !== "string") {
      return res.status(400).send({
        erro: "Categoria inválida.",
      });
    }

    // verifica se é uma data válida quando enviada
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (date !== undefined && !dateRegex.test(date)) {
      return res.status(400).send({
        erro: "Formato de data inválido. Use YYYY-MM-DD.",
      });
    }

    // verifica se foi enviado com o tipo correto(string)
    if (description !== undefined && typeof description !== "string") {
      return res.status(400).send({
        erro: "Descrição de despesa ausente ou inválido.",
      });
    }

    const expense = Expense.update(
      title,
      amount,
      category,
      date,
      description,
      Number(id),
    );

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).send({
      erro: error.message,
    });
  }
});

app.delete("/expenses/:id", (req, res) => {
  try {
    const { id } = req.params;

    Expense.delete(Number(id));

    res.status(204).json();
  } catch (error) {
    res.status(400).send({
      erro: error.message,
    });
  }
});

// Extras
app.get("/expenses/summary/total", (req, res) => {
  try {
    const totalExpenses = Expense.getTotalExpenses();

    if (!totalExpenses) {
      return res.status(400).send({
        message: "Nenhuma despesa cadastrada para somar.",
      });
    }

    res.status(200).json(totalExpenses);
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
});

app.get("/expenses/summary/category", (req, res) => {
  try {
    const totalExpensesByCategory = Expense.getTotalExpensesByCategory();

    if (!totalExpensesByCategory) {
      return res.status(400).send({
        message: "Nenhuma despesa cadastrada para somar.",
      });
    }

    res.status(200).json(totalExpensesByCategory);
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
});

app.listen(3000, () => {
  console.info(`Servidor rodando na porta ${3000}`);
});
