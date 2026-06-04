const express = require('express');

const router = express.Router();
const UserView = require('./../views/user');
const authMiddleware = require('./../middleware/auth');

router.post("/users", UserView.create);
router.post("/users/login", UserView.login);

router.get("/users", authMiddleware, UserView.getAll);
router.get("/users/:id", authMiddleware, UserView.getById);
router.put("/users/:id", authMiddleware, UserView.update);
router.delete("/users/:id", authMiddleware, UserView.delete);

module.exports = router;