const Model = require('../models/user');
const jwt = require('jsonwebtoken');
// const authConfig = require('../config/auth');

class User {
    constructor() {
    }

    replacePassword(password) {
        return '*'.repeat(password.length);
    }

    mapUser(user) {
        const userData = user.dataValues || user; // Para lidar com instâncias do Sequelize ou objetos simples
        
        return {
            ...userData,
            password: this.replacePassword(userData.password)
        };
    }

    mapPublicUser(user) {
        const mapped = this.mapUser(user);

        return {
            id: mapped.id,
            email: mapped.email,
            name: mapped.name
        };
    }

    async getAll() {
        return (await Model.getAllUsers())
            .map(u => this.mapUser(u));
    }

    async create(email, password, name) {
        if (password.length < 6) {
            throw new Error('A senha deve conter pelo menos 6 caracteres');
        }

        if (email.length < 5 || !email.includes('@')) {
            throw new Error('O email deve conter pelo menos 5 caracteres e incluir um "@"');
        }

        const user = await Model.createUser(email, password, name);
        return { ...user, password: this.replacePassword(user.password) };
    }

    async login(email, password) {
        const user = await Model.getUserByEmail(email);

        if (!user || user.password !== password) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            authConfig.jwt.secret,
            { expiresIn: authConfig.jwt.expiresIn }
        );

        return {
            token,
            user: this.mapPublicUser(user)
        };
    }
    
    async getById(id) {
        const user = await Model.getUserById(id);

        return this.mapUser(user);
    }
    
    async update(id, email, password, name) {
        if (password.length < 6) {
            throw new Error('A senha deve conter pelo menos 6 caracteres');
        }

        if (email.length < 5 || !email.includes('@')) {
            throw new Error('O email deve conter pelo menos 5 caracteres e incluir um "@"');
        }

        const user = await Model.updateUser(id, email, password, name);
        return { ...user, password: this.replacePassword(user.password) };
    }
    
    async delete(id) {
        return await Model.deleteUser(id);
    }
}

module.exports = new User();