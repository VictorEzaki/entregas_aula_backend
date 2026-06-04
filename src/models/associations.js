const CategoryModel = require('./category');
const ExpenseModel = require('./expense');

const Category = CategoryModel.Category;
const Expense = ExpenseModel.Expense;

Category.hasMany(Expense, {
    foreignKey: 'categoryId',
    as: 'expenses'
});

Expense.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});
