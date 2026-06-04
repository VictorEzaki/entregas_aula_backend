const UserController = require('../controllers/user');

class UserView {
    constructor() {
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const auth = await UserController.login(email, password);
            return res.json(auth);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const users = await UserController.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { email, password, name } = req.body;

            const newUser = await UserController.create(email, password, name);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(error.status).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await UserController.getById(id);

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { email, password, name } = req.body;

            const updatedUser = await UserController.update(id, email, password, name);

            res.json(updatedUser);
        } catch (error) {
            res.status(error.status).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await UserController.delete(id);

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserView();
