// validações e regra de negócio
const CategoryModel = require('../models/category');

class CategoryController {
    async getAll() {   
        return await CategoryModel.getAll();
    }
    
    async getById(id) {
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
        
        const category = await CategoryModel.getById(id); 
        if (!category) {
            const error = new Error('Categoria não encontrada.');
            error.status = 404;
            throw error;
        }
        
        return category;
    }
    
    async create(description) {
        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            const error = new Error("Descrição de categoria ausente ou inválido.");
            error.status = 400;
            throw error;
        }
        
        const categoryCreated = await CategoryModel.create(description)
        
        if (!categoryCreated) {
            const error = new Error('Erro ao criar categoria.');
            error.status = 500;
            throw error;
        }
        
        return categoryCreated;
    }
    
    async update(description, id) {
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
        
        // verifica se foi enviado com o tipo correto(string)
        if (description !== undefined && typeof description !== "string") {
            const error = new Error("Descrição de categoria ausente ou inválido.");
            error.status = 400;
            throw error;
        }
        
        const category = await CategoryModel.getById(id);
        if (!category) {
            const error = new Error('Categoria não encontrada.');
            error.status = 404;
            throw error;
        }
        
        const categoryUpdated = await CategoryModel.update(description, id);
        if (!categoryUpdated) {
            const error = new Error('Ocorreu um erro ao editar a categoria!');
            error.status = 500;
            throw error;
        }
        
        return categoryUpdated;
    }
    
    async delete(id) {
        // ID é obrigatório para edição
        if (!id) {
            throw new Error('ID é obrigatório.')
        }
        
        // verifica se ID é maior que zero
        if (id < 1) {
            throw new Error('ID não pode ser menor que 1.')
        }
        
        const category = await CategoryModel.getById(Number(id));
        if (!category) {
            const error = new Error('Categoria não encontrada.');
            error.status = 404;
            throw error;
        }
        
        return CategoryModel.delete(Number(id));
    }
}

module.exports = new CategoryController();