const UserController = require('../controllers/user');

class User {
    constructor() {
    }

    async login(req, res) {
        try {
            const { email, password } = req.body || {};

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const auth = await UserController.login(email, password);
            return res.json(auth);
        } catch (error) {
            console.error('Erro em login user:', error);
            return res.status(401).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const users = await UserController.getAll();
            res.json(users);
        } catch (error) {
            console.error('Erro em getAll users:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { email, password, name } = req.body || {};

            if (!email || !password || !name) {
                return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
            }

            const newUser = await UserController.create(email, password, name);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Erro em create user:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await UserController.getById(id);

            res.json(user);
        } catch (error) {
            console.error('Erro em getById user:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { email, password, name } = req.body || {};

            const updatedUser = await UserController.update(id, email, password, name);
            if (!updatedUser) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json(updatedUser);
        } catch (error) {
            console.error('Erro em update user:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await UserController.delete(id);
            if (result === null) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Erro em delete user:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new User();