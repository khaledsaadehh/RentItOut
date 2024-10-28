
const express = require('express');
const router = express.Router();


const userController = require('./controllers/User/user');
const itemController = require("./controllers/items/item")
const logisticController = require("./controllers/logistics/logistic");
const paymentController = require("./controllers/payments/payment");
const rentalController = require("./controllers/rentals/rental");
const reviewController = require("./controllers/reviews/review");
const transactionFeeController = require("./controllers/transaction_fees/transaction_fees");
const damageDepositsController = require("./controllers/damage_deposits/damage_deposits");
const insurancePlansController = require("./controllers/insurance_plans/insurance_plans");
const rentalInsuranceController = require("./controllers/rental_insurance/rental_insurance");
const recommendationsController = require("./controllers/recommendations/recommendations");
const ratingsController = require("./controllers/ratings/ratings");
const recentViewsController = require("./controllers/recent_views/recent_views");


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

router.post('/RentItOut/api/v1/transaction-fee', transactionFeeController.addTransactionFee);
router.get("/RentItOut/api/v1/transaction-fees", transactionFeeController.getTransactionFeesList);
router.get("/RentItOut/api/v1/transaction-fee/:id", transactionFeeController.getTransactionFeeById);
router.patch("/RentItOut/api/v1/transaction-fee/:id", transactionFeeController.updateTransactionFee);
router.delete("/RentItOut/api/v1/transaction-fee/:id", transactionFeeController.deleteTransactionFee);

router.post('/RentItOut/api/v1/damage-deposit', damageDepositsController.addDamageDeposit);
router.get("/RentItOut/api/v1/damage-deposits", damageDepositsController.getDamageDepositsList);
router.get("/RentItOut/api/v1/damage-deposit/:id", damageDepositsController.getDamageDepositById);
router.patch("/RentItOut/api/v1/damage-deposit/:id", damageDepositsController.updateDamageDeposit);
router.delete("/RentItOut/api/v1/damage-deposit/:id", damageDepositsController.deleteDamageDeposit);

router.post('/RentItOut/api/v1/insurance-plan', insurancePlansController.addInsurancePlan);
router.get("/RentItOut/api/v1/insurance-plans", insurancePlansController.getInsurancePlansList);
router.get("/RentItOut/api/v1/insurance-plan/:id", insurancePlansController.getInsurancePlanById);
router.patch("/RentItOut/api/v1/insurance-plan/:id", insurancePlansController.updateInsurancePlan);
router.delete("/RentItOut/api/v1/insurance-plan/:id", insurancePlansController.deleteInsurancePlan);

router.post('/RentItOut/api/v1/rental-insurance', rentalInsuranceController.addRentalInsurance);
router.get("/RentItOut/api/v1/rental-insurances", rentalInsuranceController.getRentalInsurancesList);
router.get("/RentItOut/api/v1/rental-insurance/:id", rentalInsuranceController.getRentalInsuranceById);
router.patch("/RentItOut/api/v1/rental-insurance/:id", rentalInsuranceController.updateRentalInsurance);
router.delete("/RentItOut/api/v1/rental-insurance/:id", rentalInsuranceController.deleteRentalInsurance);

router.post('/RentItOut/api/v1/recommendation', recommendationsController.addRecommendation);
router.get("/RentItOut/api/v1/recommendations", recommendationsController.getRecommendationsList);
router.get("/RentItOut/api/v1/recommendation/:id", recommendationsController.getRecommendationById);
router.patch("/RentItOut/api/v1/recommendation/:id", recommendationsController.updateRecommendation);
router.delete("/RentItOut/api/v1/recommendation/:id", recommendationsController.deleteRecommendation);

router.post('/RentItOut/api/v1/rating', ratingsController.addRating);
router.get("/RentItOut/api/v1/ratings", ratingsController.getRatingsList);
router.get("/RentItOut/api/v1/rating/:id", ratingsController.getRatingById);
router.patch("/RentItOut/api/v1/rating/:id", ratingsController.updateRating);
router.delete("/RentItOut/api/v1/rating/:id", ratingsController.deleteRating);

router.post('/RentItOut/api/v1/recent-view', recentViewsController.addRecentView);
router.get("/RentItOut/api/v1/recent-views", recentViewsController.getRecentViewsList);
router.get("/RentItOut/api/v1/recent-view/:id", recentViewsController.getRecentViewById);
router.patch("/RentItOut/api/v1/recent-view/:id", recentViewsController.updateRecentView);
router.delete("/RentItOut/api/v1/recent-view/:id", recentViewsController.deleteRecentView);


module.exports =  router;
    