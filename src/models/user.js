const { DataTypes } = require('sequelize'); 
const sequelize = require('./database.js');

const db = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

class UserModel {
    
    constructor() {}
    
    async getAllUsers() {
        return db.findAll();
    }
    
    async createUser(email, password, name) {
        return db.create({ email, password, name });
    }
    
    async getUserByEmail(email) {
        return db.findOne({ where: { email } });
    }
    
    async getUserById(id) {
        return db.findByPk(id);
    }
    
    async updateUser(id, email, password, name) {
        const user = await db.findByPk(id);
        
        if (!user) {
            return null;
        }
        
        user.email = email;
        user.password = password;
        user.name = name;
        
        await user.save();
        
        return user;
    }
    
    async deleteUser(id) {
        return db.destroy({
            where: { id }
        });
    }
    
}

const userModel = new UserModel();
userModel.User = db;

module.exports = userModel;