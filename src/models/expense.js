const pathData = './src/data/expenses.json';
const fs = require('fs');

class ExpenseModel {
    constructor() {
        this.idCounter = 1;
        this.init();
    }

    init() {
        try {
            let expenseList = this.getAll();
            if (!expenseList) {
                throw new Error('Nenhuma despesa cadastrada.');
            }

            this.idCounter = expenseList.length + 1;
        } catch (error) {
            console.error('Erro: ', error.message);
        }
    }

    getAll() {
        let expenseList = [];
        if (fs.existsSync(pathData)) {
            const expenses = fs.readFileSync(pathData, 'utf8');
            if (expenses) {
                expenseList = JSON.parse(expenses);
            }
        }

        return expenseList;
    }

    getById(id) {
        let expenses = this.getAll();

        return expenses.find(e => e.id === id);
    }

    create(title, amount, category, date, description) {
        const newExpense = {
            id: this.idCounter++,
            title,
            amount,
            category,
            date,
            description,
            createdAt: new Date().toISOString()
        }

        let expenseList = [];
        if (fs.existsSync(pathData)) {
            const oldData = fs.readFileSync(pathData, 'utf8');
            if (oldData) {
                expenseList = JSON.parse(oldData);
            }
        }
        expenseList.push(newExpense);

        fs.writeFileSync(pathData, JSON.stringify(expenseList, null, 2));

        return newExpense;
    }

    update(title, amount, category, date, description, id) {
        let expenseList = this.getAll();

        const index = expenseList.findIndex(expense => expense.id === id);
        const updatedExpense = {
            ...expenseList[index],
            title,
            amount,
            category,
            date,
            description,
            createdAt: expenseList[index].createdAt
        }

        expenseList[index] = updatedExpense;

        if (fs.existsSync(pathData)) {
            fs.writeFileSync(pathData, JSON.stringify(expenseList, null, 2));
        }

        return updatedExpense;
    }

    delete(id) {
        let expenseList = this.getAll();

        const index = expenseList.findIndex(e => e.id === id);
        console.log(index);
        expenseList.splice(index, 1);

        if (fs.existsSync(pathData)) {
            fs.writeFileSync(pathData, JSON.stringify(expenseList, null, 2));
        }

        return null;
    }

    getTotalExpenses() {
        const expenses = this.getAll();

        const totalExpense = expenses.reduce((acc, expense) => {
            return acc + (Number(expense.amount) || 0);
        }, 0);

        return {
            total: totalExpense
        };
    }

    getTotalExpensesByCategory() {
        const expenses = this.getAll();

        const totals = expenses.reduce((acc, expense) => {
            const category = expense.category || "Sem Categoria";
            const amount = Number(expense.amount) || 0;

            if (!acc[category]) {
                acc[category] = 0;
            }

            acc[category] += amount;
            return acc;
        }, {});

        return totals;
    }
}

module.exports = new ExpenseModel();