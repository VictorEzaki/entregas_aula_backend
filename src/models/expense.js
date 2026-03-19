const pathData = './src/data/expenses.json';
const fs = require('fs');

class Expense {
    constructor() {
        this.idCounter = 1;
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

        try {
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
        } catch (error) {
            throw new Error ('Erro ao salvar despesa: ' + error.message);
        }
    }
}

module.exports = new Expense();