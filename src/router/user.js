const express = require('express');

const router = express.Router();
const UserView = require('./../views/user');

router.post("/users", UserView.create);
router.post("/users/login", UserView.login);

router.get("/users", UserView.getAll);
router.get("/users/:id", UserView.getById);
router.put("/users/:id", UserView.update);
router.delete("/users/:id", UserView.delete);

module.exports = router;