const express = require("express");
const ExpenseView = require("./views/expense.js");

const app = express();

app.use(express.json());

app.post("/api/expenses", ExpenseView.create);
app.get("/api/expenses", ExpenseView.getAll);
app.get("/api/expenses/:id", ExpenseView.getById);
app.put("/api/expenses/:id", ExpenseView.update);
app.delete("/api/expenses/:id", ExpenseView.delete);

// Extras
app.get("/api/expenses/summary/total", ExpenseView.getTotalExpenses);
app.get("/api/expenses/summary/category", ExpenseView.getTotalExpensesByCategory);
app.listen(3000, () => {
  console.info(`Servidor rodando na porta ${3000}`);
});
