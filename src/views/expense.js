// req, res
const ExpenseController = require('../controllers/expense');

class ExpenseView {
    async getAll(req, res) {
        try {
            let { category, date } = req.query;

            const expenses = await ExpenseController.getAll(category, date);

            res.status(200).json(expenses);
        } catch (error) {
            res.status(error.status).json({
                erro: error.message,
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const expense = await ExpenseController.getById(Number(id));

            res.status(200).json(expense);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { title, amount, category, date, description } = req.body;

            const expense = await ExpenseController.create(title, amount, category, date, description);

            res.status(201).json(expense);
        } catch (error) {
            res.status(error.status).json({
                erro: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const { title, amount, category, date, description } = req.body;
            const { id } = req.params;

            const expense = await ExpenseController.update(title, amount, category, date, description, Number(id));

            res.status(200).json(expense);
        } catch (error) {
            res.status(error.status).json({
                erro: error.message,
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await ExpenseController.delete(Number(id));

            res.status(204).json();
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }

    async getTotalExpenses(req, res) {
        try {
            const totalExpenses = await ExpenseController.getTotalExpenses();

            res.status(200).json(totalExpenses);
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }

    async getTotalExpensesByCategory(req, res) {
        try {
            const totalExpensesByCategory = await ExpenseController.getTotalExpensesByCategory();

            res.status(200).json(totalExpensesByCategory);
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }
}

module.exports = new ExpenseView();