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
            throw new Error('Formato de data inválido. Use YYYY-MM-DD.');
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
            throw new Error('Título de despesa é um campo obrigatório.');
        }
        // * O campo amount deve ser maior que zero
        if (amount !== undefined && amount < 0) {
            throw new Error('Valor da despesa não pode ser menor que zero.');
        }

        // * O campo date não pode ser no futuro
        if (date) {
            const dateAtual = new Date().toISOString().split('T')[0];
            const dateDespesa = new Date(date).toISOString().split('T')[0];

            if (dateDespesa > dateAtual) {
                throw new Error('A data da despesa não pode ser maior que atual.');
            }
        }

        // Validações extras para tratamento
        // verifica se o title foi enviado ou se está com o tipo correto
        if (title !== undefined && typeof title !== "string") {
            throw new Error("Título de despesa inválido.")
        }

        // verifica se amount é number caso tenha sido enviado
        if (amount !== undefined && typeof amount !== "number") {
            throw new Error("Valor de despesa inválido.");
        }

        // verifica se categoria foi enviado no tipo correto
        if (category !== undefined && typeof category !== "string") {
            throw new Error("Categoria inválida.");
        }

        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            throw new Error("Descrição de despesa ausente ou inválido.");
        }

        const expenseCreated = ExpenseModel.create(title, amount, category, date, description)

        if (!expenseCreated) {
            throw new Error('Erro ao criar despesa');
        }

        return expenseCreated;
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
            const dateAtual = new Date().toISOString().split('T')[0];
            const dateDespesa = new Date(date).toISOString().split('T')[0];

            if (dateDespesa > dateAtual) {
                throw new Error('A data da despesa não pode ser maior que atual.');
            }
        }

        // validações extras para tratamento
        // verifica se o title foi enviado ou se está com o tipo correto
        if (title !== undefined && typeof title !== "string") {
            throw new Error("Título de despesa inválido.");
        }

        // verifica se amount é number caso tenha sido enviado
        if (amount !== undefined && typeof amount !== "number") {
            throw new Error("Valor de despesa inválido.");
        }

        // verifica se categoria foi enviado no tipo correto
        if (category !== undefined && typeof category !== "string") {
            throw new Error("Categoria inválida.");
        }

        // verifica se é uma data válida quando enviada
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (date !== undefined && !dateRegex.test(date)) {
            throw new Error("Formato de data inválido. Use YYYY-MM-DD.");
        }

        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            throw new Error("Descrição de despesa ausente ou inválido.");
        }

        const expenseUpdated = ExpenseModel.update(title, amount, category, date, description, id);

        if (!expenseUpdated) {
            throw new Error('Ocorreu um erro ao editar a despesa!');
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