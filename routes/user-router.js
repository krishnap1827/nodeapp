const express = require('express');
const { loginCheck, getUsers, saveUsers,
    getUserById, 
    updateUsers,
    updateUserStatus} = require('../controllers/user-controller');
const { jwtMiddleware } = require('../services/jwtMiddleware');
const router = express.Router();


router.post("/login", loginCheck);

router.get("/users", jwtMiddleware, getUsers);

router.get("/user/:id", jwtMiddleware, getUserById);

router.post("/saveuser", jwtMiddleware, saveUsers);

router.put("/updateuser", jwtMiddleware, updateUsers);

router.put("/updateuserstatus", jwtMiddleware, updateUserStatus);



module.exports = router;