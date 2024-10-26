
const express = require('express');
const router = express.Router();


const userController = require('./controllers/User/user');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');
const { getPublicData, getUserData, getAdminData } = require('./controllers/User/user');


router.post('/RentItOut/api/v1/register',userController.register);
router.post('/RentItOut/api/v1/login',userController.login);
router.get("/RentItOut/api/v1/users", userController.getUserList);
router.get("/RentItOut/api/v1/user/:id", userController.getUserListById);
router.get("/RentItOut/api/v1/users-list-by-name/:name", userController.getUserListByName);
router.get("/RentItOut/api/v1/users-list-by-email/:email", userController.getUserListByEmail);
router.patch("/RentItOut/api/v1/user/:id", userController.updateUser);
router.delete("/RentItOut/api/v1/user/:id", userController.deleteUser);



module.exports =  router;
    