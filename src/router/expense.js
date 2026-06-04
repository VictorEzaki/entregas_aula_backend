const express = require('express');

const router = express.Router();
const ExpenseView = require('./../views/expense');

router.post("/expenses", ExpenseView.create);
router.get("/expenses", ExpenseView.getAll);
router.get("/expenses/:id", ExpenseView.getById);
router.put("/expenses/:id", ExpenseView.update);
router.delete("/expenses/:id", ExpenseView.delete);

// Extras
router.get("/expenses/summary/total", ExpenseView.getTotalExpenses);
router.get("/expenses/summary/category", ExpenseView.getTotalExpensesByCategory);

module.exports = router;
