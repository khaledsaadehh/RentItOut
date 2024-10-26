
const express = require('express');
const router = express.Router();


const userController = require('./controllers/User/user');
const itemController = require("./controllers/items/item")
const logisticController = require("./controllers/logistics/logistic");
const paymentController = require("./controllers/payments/payment");
const rentalController = require("./controllers/rentals/rental");
const reviewController = require("./controllers/reviews/review");


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


router.post('/RentItOut/api/v1/item',itemController.addItem);
router.get("/RentItOut/api/v1/items", itemController.getItemsList);
router.get("/RentItOut/api/v1/item/:id", itemController.getItemById);
router.patch("/RentItOut/api/v1/item/:id", itemController.updateItem);
router.delete("/RentItOut/api/v1/item/:id", itemController.deleteItem);

router.post('/RentItOut/api/v1/logistic', logisticController.addLogistic);
router.get("/RentItOut/api/v1/logistics", logisticController.getLogisticsList);
router.get("/RentItOut/api/v1/logistic/:id", logisticController.getLogisticById);
router.patch("/RentItOut/api/v1/logistic/:id", logisticController.updateLogistic);
router.delete("/RentItOut/api/v1/logistic/:id", logisticController.deleteLogistic);

router.post('/RentItOut/api/v1/payment', paymentController.addPayment);
router.get("/RentItOut/api/v1/payments", paymentController.getPaymentsList);
router.get("/RentItOut/api/v1/payment/:id", paymentController.getPaymentById);
router.patch("/RentItOut/api/v1/payment/:id", paymentController.updatePayment);
router.delete("/RentItOut/api/v1/payment/:id", paymentController.deletePayment);

router.post('/RentItOut/api/v1/rental', rentalController.addRental);
router.get("/RentItOut/api/v1/rentals", rentalController.getRentalsList);
router.get("/RentItOut/api/v1/rental/:id", rentalController.getRentalById);
router.patch("/RentItOut/api/v1/rental/:id", rentalController.updateRental);
router.delete("/RentItOut/api/v1/rental/:id", rentalController.deleteRental);

router.post('/RentItOut/api/v1/review', reviewController.addReview);
router.get("/RentItOut/api/v1/reviews", reviewController.getReviewsList);
router.get("/RentItOut/api/v1/review/:id", reviewController.getReviewById);
router.patch("/RentItOut/api/v1/review/:id", reviewController.updateReview);
router.delete("/RentItOut/api/v1/review/:id", reviewController.deleteReview);


module.exports =  router;
    