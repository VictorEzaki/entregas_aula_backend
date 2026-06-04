const sequelize = require('./database.js');
const { fn, col } = require('sequelize');
const { DataTypes } = require('sequelize'); 
const CategoryModel = require('./category.js');

const db = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    updatedAt: false
});

class ExpenseModel {
    constructor() {}
    
    async getAll() {
        return db.findAll();
    }
    
    async getById(id) {
        return db.findOne({
            where: { id }
        });
    }
    
    async create(title, amount, categoryId, date, description) {
        return db.create({title, amount, categoryId, date, description})
    }
    
    async update(title, amount, categoryId, date, description, id) {
        const expense = await db.findByPk(id);
        
        if (!expense) {
            return null;
        }
        
        expense.title = title;
        expense.amount = amount;
        expense.categoryId = categoryId;
        expense.date = date;
        expense.description = description;
        
        await expense.save();
        
        return expense;
    }
    
    async delete(id) {
        return db.destroy({
            where: { id }
        });
    }

    async getTotalExpenses() {
        return db.findAll({
            attributes: [
                [fn('SUM', col('amount')), 'total']
            ]
        });
    }
    
    async getTotalExpensesByCategory() {
        return db.findAll({
            attributes: [
                'categoryId',
                [fn('SUM', col('amount')), 'total']
            ],
            include: [{
                model: CategoryModel.Category,
                as: 'category',
                attributes: ['description']
            }],
            group: ['categoryId', 'category.id']
        });
    }
}

const expenseModel = new ExpenseModel();
expenseModel.Expense = db;

module.exports = expenseModel;
