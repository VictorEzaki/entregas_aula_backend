const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../database.js');

const db = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    updatedAt: false
});

class CategoryModel {
    constructor() {}
    
    async getAll() {
        return db.findAll();
    }
    
    async getById(id) {
        return db.findOne({
            where: { id }
        });
    }
    
    async create(description) {
        return db.create({description})
    }
    
    async update(description, id) {
        return db.update(
            { description },
            { where: { id } }
        );
    }
    
    async delete(id) {
        return db.destroy({
            where: { id }
        });
    }
}

const categoryModel = new CategoryModel();
categoryModel.Category = Category;

module.exports = categoryModel;
