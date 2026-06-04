// req, res
const CategoryController = require('../controllers/category');

class CategoryView {
    async getAll(req, res) {
        try {
            const categories = await CategoryController.getAll();

            res.status(200).json(categories);
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message || 'Ocorreu um erro ao buscar categorias.',
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryController.getById(Number(id));

            res.status(200).json(category);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { description } = req.body;

            const category = await CategoryController.create(description);

            res.status(201).json(category);
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const { description } = req.body;
            const { id } = req.params;

            const category = await CategoryController.update(description, Number(id));

            res.status(200).json(category);
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await CategoryController.delete(Number(id));

            res.status(204).send();
        } catch (error) {
            res.status(400).json({
                error: error.message,
            });
        }
    }
}

module.exports = new CategoryView();