const pathData = './src/data/expenses.json';
const fs = require('fs');

class Expense {
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
        if (!id) {
            throw new Error('ID não informado.');
        }

        if (id < 1) {
            throw new Error('ID não pode ser menor que 1.');
        }

        let expenses = this.getAll();

        return expenses.find(e => e.id === id);
    }
    
    create(title, amount, category, date, description) {        
        // validações da regra de negócio
        // O campo title é obrigatório
        if (!title) {
            throw new Error('Título de despesa é um campo obrigatório.')
        }
        
        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            throw new Error('Valor da despesa não pode ser menor que zero.')
        }
        
        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual     = new Date().toISOString().split('T')[0];
            const dateDespesa   = new Date(date).toISOString().split('T')[0];
            
            if (dateDespesa > dateAtual) {
                throw new Error('A data da despesa não pode ser maior que atual.');
            }
        }
        
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
        // validações da regra de negócio
        // ID é obrigatório para edição
        if (!id) {
            throw new Error('ID é obrigatório.')
        }

        // verifica se ID é maior que zero
        if (id < 1) {
            throw new Error('ID não pode ser menor que 1.')
        }

        // O campo title é obrigatório
        if (!title) {
            throw new Error('Título de despesa é um campo obrigatório.')
        }
        
        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            throw new Error('Valor da despesa não pode ser menor que zero.')
        }
        
        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual     = new Date().toISOString().split('T')[0];
            const dateDespesa   = new Date(date).toISOString().split('T')[0];
            
            if (dateDespesa > dateAtual) {
                throw new Error('A data da despesa não pode ser maior que atual.');
            }
        }
        
        let expenseList = this.getAll();
        const index = expenseList.findIndex(e => e.id === id);
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
        // ID é obrigatório para edição
        if (!id) {
            throw new Error('ID é obrigatório.')
        }

        // verifica se ID é maior que zero
        if (id < 1) {
            throw new Error('ID não pode ser menor que 1.')
        }
        
        let expenseList = this.getAll();
        const index = expenseList.findIndex(e => e.id === id);
        expenseList.splice(index, 1);

        if (fs.existsSync(pathData)) {
            fs.writeFileSync(pathData, JSON.stringify(expenseList, null, 2));
        }
        
        return null
    }
}

module.exports = new Expense();