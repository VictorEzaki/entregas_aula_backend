const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../database.js');

const User = sequelize.define('users', {
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
        return await User.findAll();
    }

    async createUser(email, password, name) {
        return await User.create({ email, password, name });
    }

    async getUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async getUserById(id) {
        return await User.findByPk(id);
    }

    async updateUser(id, email, password, name) {
        const user = await this.getUserById(id);

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
        const user = await this.getUserById(id);

        if (!user) {
            return null;
        }

        await user.destroy();
        return null;
    }

}

const userModel = new UserModel();
userModel.User = User;

module.exports = userModel;