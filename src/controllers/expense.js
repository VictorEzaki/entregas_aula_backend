// validações e regra de negócio
const expense = require('../models/expense');
const ExpenseModel = require('../models/expense');

class ExpenseController {
    getAll(category, date) {
        let expenses = ExpenseModel.getAll();

        if (category) {
            expenses = expenses.filter(
                (expense) => expense.category.toLowerCase() === category.toLowerCase(),
            );
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (date !== undefined && !dateRegex.test(date)) {
            const error = new Error('Formato de data inválido. Use YYYY-MM-DD.');
            error.status = 400;
            throw error;
        }
        if (date) {
            expenses = expenses.filter((expense) => expense.date === date);
        }

        return expenses;
    }

    getById(id) {
        if (!id) {
            const error = new Error('ID não informado.');
            error.status = 400;
            throw error;
        }
        
        if (id < 1) {
            const error = new Error('ID não pode ser menor que 1.');
            error.status = 400;
            throw error;
        }
        
        const expense = ExpenseModel.getById(id); 
        if (!expense) {
            const error = new Error('Despesa não encontrada.');
            error.status = 404;
            throw error;
        }

        return expense;
    }

    create(title, amount, category, date, description) {
        // validações da regra de negócio
        // O campo title é obrigatório
        if (!title) {
            const error = new Error('Título de despesa é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            const error = new Error('Valor da despesa não pode ser menor que zero.');
            error.status = 400;
            throw error;
        }
        
        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual = new Date().toISOString().split('T')[0];
            const dateDespesa = new Date(date).toISOString().split('T')[0];
            
            if (dateDespesa > dateAtual) {
                const error = new Error('A data da despesa não pode ser maior que atual.');
                error.status = 400;
                throw error;
            }
        }
        
        // Validações extras para tratamento
        // verifica se o title foi enviado ou se está com o tipo correto
        if (title !== undefined && typeof title !== "string") {
            const error = new Error("Título de despesa inválido.")
            error.status = 400;
            throw error;
        }
        
        // verifica se amount é number caso tenha sido enviado
        if (amount !== undefined && typeof amount !== "number") {
            const error = new Error("Valor de despesa inválido.");
            error.status = 400;
            throw error;
        }

        // verifica se categoria foi enviado no tipo correto
        if (category !== undefined && typeof category !== "string") {
            const error = new Error("Categoria inválida.");
            error.status = 400;
            throw error;
        }

        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            const error = new Error("Descrição de despesa ausente ou inválido.");
            error.status = 400;
            throw error;
        }

        const expenseCreated = ExpenseModel.create(title, amount, category, date, description)

        if (!expenseCreated) {
            const error = new Error('Erro ao criar despesa');
            error.status = 500;
            throw error;
        }

        return expenseCreated;
    }

    update(title, amount, category, date, description, id) {
        // validações da regra de negócio
        // ID é obrigatório para edição
        if (!id) {
            const error = new Error('ID é obrigatório.')
            error.status = 400;
            throw error;
        }

        // verifica se ID é maior que zero
        if (id < 1) {
            const error = new Error('ID não pode ser menor que 1.')
            error.status = 400;
            throw error;
        }

        // O campo title é obrigatório
        if (!title) {
            const error = new Error('Título de despesa é um campo obrigatório.')
            error.status = 400;
            throw error;
        }

        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            const error = new Error('Valor da despesa não pode ser menor que zero.')
            error.status = 400;
            throw error;
        }

        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual = new Date().toISOString().split('T')[0];
            const dateDespesa = new Date(date).toISOString().split('T')[0];

            if (dateDespesa > dateAtual) {
                const error = new Error('A data da despesa não pode ser maior que atual.');
                error.status = 400;
                throw error;
            }
        }

        // validações extras para tratamento
        // verifica se o title foi enviado ou se está com o tipo correto
        if (title !== undefined && typeof title !== "string") {
            const error = new Error("Título de despesa inválido.");
            error.status = 400;
            throw error;
        }

        // verifica se amount é number caso tenha sido enviado
        if (amount !== undefined && typeof amount !== "number") {
            const error = new Error("Valor de despesa inválido.");
            error.status = 400;
            throw error;
        }

        // verifica se categoria foi enviado no tipo correto
        if (category !== undefined && typeof category !== "string") {
            const error = new Error("Categoria inválida.");
            error.status = 400;
            throw error;
        }

        // verifica se é uma data válida quando enviada
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (date !== undefined && !dateRegex.test(date)) {
            const error = new Error("Formato de data inválido. Use YYYY-MM-DD.");
            error.status = 400;
            throw error;
        }

        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            const error = new Error("Descrição de despesa ausente ou inválido.");
            error.status = 400;
            throw error;
        }

        console.log(id);
        const expense = ExpenseModel.getById(id);
        console.log(expense);
        if (!expense) {
            const error = new Error('Despesa não encontrada.');
            error.status = 404;
            throw error;
        }
        
        const expenseUpdated = ExpenseModel.update(title, amount, category, date, description, id);
        if (!expenseUpdated) {
            const error = new Error('Ocorreu um erro ao editar a despesa!');
            error.status = 500;
            throw error;
        }

        return expenseUpdated;
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

        return ExpenseModel.delete(id);
    }

    getTotalExpenses() {
        const totalExpenses = ExpenseModel.getTotalExpenses();

        if (!totalExpenses) {
            throw new Error("Nenhuma despesa cadastrada para somar.");
        }

        return totalExpenses;
    }

    getTotalExpensesByCategory() {
        const totalExpensesByCategory = ExpenseModel.getTotalExpensesByCategory();

        if (!totalExpensesByCategory) {
            throw new Error("Nenhuma despesa cadastrada para somar.");
        }

        return totalExpensesByCategory;
    }
}

module.exports = new ExpenseController();