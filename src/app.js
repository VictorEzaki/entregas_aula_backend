const express = require("express");
const ExpenseView = require("./views/expense.js");

const app = express();

app.use(express.json());

app.post("/expenses", ExpenseView.create);
app.get("/expenses", ExpenseView.getAll);
app.get("/expenses/:id", ExpenseView.getById);
app.put("/expenses/:id", ExpenseView.update);
app.delete("/expenses/:id", ExpenseView.delete);

// Extras
app.get("/expenses/summary/total", ExpenseView.getTotalExpenses);
app.get("/expenses/summary/category", ExpenseView.getTotalExpensesByCategory);
app.listen(3000, () => {
  console.info(`Servidor rodando na porta ${3000}`);
});
