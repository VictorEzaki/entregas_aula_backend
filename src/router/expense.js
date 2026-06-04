const express = require('express');

const router = express.Router();
const ExpenseView = require('./../views/expense');

const authMiddleware = require('./../middleware/auth');

router.post("/expenses", authMiddleware, ExpenseView.create);
router.get("/expenses", authMiddleware, ExpenseView.getAll);
router.get("/expenses/:id", authMiddleware, ExpenseView.getById);
router.put("/expenses/:id", authMiddleware, ExpenseView.update);
router.delete("/expenses/:id", authMiddleware, ExpenseView.delete);

// Extras
router.get("/expenses/summary/total", authMiddleware, ExpenseView.getTotalExpenses);
router.get("/expenses/summary/category", authMiddleware, ExpenseView.getTotalExpensesByCategory);

module.exports = router;
