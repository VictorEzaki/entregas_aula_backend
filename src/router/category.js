const express = require('express');

const router = express.Router();
const CategoryView = require('./../views/category');

const authMiddleware = require('./../middleware/auth');

router.post("/categories", authMiddleware, CategoryView.create);
router.get("/categories", authMiddleware, CategoryView.getAll);
router.get("/categories/:id", authMiddleware, CategoryView.getById);
router.put("/categories/:id", authMiddleware, CategoryView.update);
router.delete("/categories/:id", authMiddleware, CategoryView.delete);

module.exports = router;
