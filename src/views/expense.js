// req, res
const ExpenseController = require('../controllers/expense');
const expense = require('../models/expense');

class ExpenseView {
    getAll(req, res) {
        try {
            let { category, date } = req.query;

            const expenses = ExpenseController.getAll(category, date);

            res.status(200).json(expenses);
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }

    getById(req, res) {
        try {
            const { id } = req.params;

            const expense = ExpenseController.getById(Number(id));

            res.status(200).json(expense);
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }

    create(req, res) {
        try {
            const { title, amount, category, date, description } = req.body;

            const expense = ExpenseController.create(title, amount, category, date, description);

            res.status(201).json(expense);
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }

    update(req, res) {
        try {
            const { title, amount, category, date, description } = req.body;
            const { id } = req.params;

            const expense = ExpenseController.update(title, amount, category, date, description, id);

            res.status(200).json(expense);
        } catch (error) {
            res.status(400).send({
                erro: error.message,
            });
        }
    }
}

module.exports = new ExpenseView();