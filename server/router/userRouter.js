// import { Router } from "express";
// import { login, register } from "../controllers/userControllers.js";

// export const userRouter = Router()

// userRouter.route('/register').post(register)
// userRouter.route('/login').post(login)



const { Router } = require('express');
const { login, register, getUsers } = require('../controllers/userControllers');

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/getUser', getUsers);

module.exports = { userRouter };
