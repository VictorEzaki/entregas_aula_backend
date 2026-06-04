const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class UserController {
    constructor() {
    }
    
    replacePassword(password) {
        return '*'.repeat(password.length);
    }
    
    mapUser(user) {
        const userData = user.dataValues || user;
        
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
        return (await UserModel.getAllUsers())
        .map(u => this.mapUser(u));
    }
    
    async create(email, password, name) {
        if (!email) {
            const error = new Error('Email é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        
        if (!password) {
            const error = new Error('Senha é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        
        if (!name) {
            const error = new Error('Nome é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        
        if (password.length < 6) {
            const error = new Error('A senha deve conter pelo menos 6 caracteres');
            error.status = 400;
            throw error;
        }
        
        if (email.length < 5 || !email.includes('@')) {
            const error = new Error('O email deve conter pelo menos 5 caracteres e incluir um "@"');
            error.status = 400;
            throw error;
        }
        
        const userExists = await UserModel.getUserByEmail(email);
        if (userExists) {
            const error = new Error('Já existe um usuário cadastrado com este email.');
            error.status = 409;
            throw error;
        }
        
        const user = await UserModel.createUser(email, password, name);
        
        const userJson = user.toJSON();
        
        return {
            ...userJson,
            password: this.replacePassword(userJson.password)
        };
    }
    
    async login(email, password) {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const user = await UserModel.getUserByEmail(email);
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
        const user = await UserModel.getUserById(id);
        
        return this.mapUser(user);
    }
    
    async update(id, email, password, name) {
        if (!email) {
            const error = new Error('Email é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        
        if (!password) {
            const error = new Error('Senha é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        
        if (!name) {
            const error = new Error('Nome é um campo obrigatório.');
            error.status = 400;
            throw error;
        }
        
        if (password.length < 6) {
            const error = new Error('A senha deve conter pelo menos 6 caracteres');
            error.status = 400;
            throw error;
        }
        
        if (email.length < 5 || !email.includes('@')) {
            const error = new Error('O email deve conter pelo menos 5 caracteres e incluir um "@"');
            error.status = 400;
            throw error;
        }
        
        const userExists = await UserModel.getUserById(Number(id));
        if (!userExists) {
            const error = new Error('Usuário não encontrado.');
            error.status = 404;
            throw error;
        }
        
        const emailExists = await UserModel.getUserByEmail(email);
        if (emailExists && emailExists.id !== Number(id)) {
            const error = new Error('Já existe um usuário cadastrado com este email.');
            error.status = 409;
            throw error;
        }
        
        const user = await UserModel.updateUser(id, email, password, name);
        const userJson = user.toJSON();
        
        return {
            ...userJson,
            password: this.replacePassword(userJson.password)
        };
    }
    
    async delete(id) {
        // ID é obrigatório para edição
        if (!id) {
            const error = new Error('ID é obrigatório.');
            error.status = 400;
            throw error;
        }
        
        // verifica se ID é maior que zero
        if (id < 1) {
            const error = new Error('ID não pode ser menor que 1.');
            error.status = 400;
            throw error;
        }
        
        const user = await UserModel.getUserById(Number(id));
        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.status = 404;
            throw error;
        }
        
        return await UserModel.deleteUser(id);
    }
}

module.exports = new UserController();
