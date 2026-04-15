const express = require("express");
const ExpenseView = require("./views/expense.js");

const app = express();

app.use(express.json());

app.post("/expenses", ExpenseView.create);

app.get("/expenses", ExpenseView.getAll);

app.get("/expenses/:id", ExpenseView.getById);

app.put("/expenses/:id", ExpenseView.update);

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
