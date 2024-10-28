const express = require('express');
const router = express.Router();

const userController = require('./controllers/User/user');
const itemController = require("./controllers/items/item");
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

router.post('/RentItOut/api/v1/register', userController.register); 
router.post('/RentItOut/api/v1/login', userController.login); 
router.get("/RentItOut/api/v1/users", authMiddleware, roleMiddleware(['admin']), userController.getUserList); 
router.get("/RentItOut/api/v1/user/:id", authMiddleware, roleMiddleware(['user', 'admin']), userController.getUserListById); 
router.get("/RentItOut/api/v1/users-list-by-name/:name", authMiddleware, roleMiddleware(['admin']), userController.getUserListByName); 
router.get("/RentItOut/api/v1/users-list-by-email/:email", authMiddleware, roleMiddleware(['admin']), userController.getUserListByEmail); 
router.patch("/RentItOut/api/v1/user/:id", authMiddleware, roleMiddleware(['admin']), userController.updateUser); 
router.delete("/RentItOut/api/v1/user/:id", authMiddleware, roleMiddleware(['admin']), userController.deleteUser); 

router.post('/RentItOut/api/v1/item', authMiddleware, roleMiddleware(['user', 'admin']), itemController.addItem); 
router.get("/RentItOut/api/v1/items", itemController.getItemsList); 
router.get("/RentItOut/api/v1/item/:id", itemController.getItemById); 
router.patch("/RentItOut/api/v1/item/:id", authMiddleware, roleMiddleware(['user', 'admin']), itemController.updateItem);
router.delete("/RentItOut/api/v1/item/:id", authMiddleware, roleMiddleware(['admin']), itemController.deleteItem); 

router.post('/RentItOut/api/v1/logistic', authMiddleware, roleMiddleware(['admin']), logisticController.addLogistic); 
router.get("/RentItOut/api/v1/logistics", logisticController.getLogisticsList); 
router.get("/RentItOut/api/v1/logistic/:id", logisticController.getLogisticById); 
router.patch("/RentItOut/api/v1/logistic/:id", authMiddleware, roleMiddleware(['admin']), logisticController.updateLogistic); 
router.delete("/RentItOut/api/v1/logistic/:id", authMiddleware, roleMiddleware(['admin']), logisticController.deleteLogistic); 

router.post('/RentItOut/api/v1/payment', authMiddleware, roleMiddleware(['admin']), paymentController.addPayment); 
router.get("/RentItOut/api/v1/payments", paymentController.getPaymentsList); 
router.get("/RentItOut/api/v1/payment/:id", paymentController.getPaymentById); 
router.patch("/RentItOut/api/v1/payment/:id", authMiddleware, roleMiddleware(['admin']), paymentController.updatePayment); 
router.delete("/RentItOut/api/v1/payment/:id", authMiddleware, roleMiddleware(['admin']), paymentController.deletePayment);

router.post('/RentItOut/api/v1/rental', authMiddleware, roleMiddleware(['user', 'admin']), rentalController.addRental); 
router.get("/RentItOut/api/v1/rentals", authMiddleware, roleMiddleware(['admin']), rentalController.getRentalsList); 
router.get("/RentItOut/api/v1/rental/:id", rentalController.getRentalById); 
router.patch("/RentItOut/api/v1/rental/:id", authMiddleware, roleMiddleware(['admin']), rentalController.updateRental); 
router.delete("/RentItOut/api/v1/rental/:id", authMiddleware, roleMiddleware(['admin']), rentalController.deleteRental); 

router.post('/RentItOut/api/v1/review', authMiddleware, roleMiddleware(['user']), reviewController.addReview); 
router.get("/RentItOut/api/v1/reviews", reviewController.getReviewsList); 
router.get("/RentItOut/api/v1/review/:id", reviewController.getReviewById); 
router.patch("/RentItOut/api/v1/review/:id", authMiddleware, roleMiddleware(['user']), reviewController.updateReview); 
router.delete("/RentItOut/api/v1/review/:id", authMiddleware, roleMiddleware(['admin']), reviewController.deleteReview); 

router.post('/RentItOut/api/v1/transaction-fee', authMiddleware, roleMiddleware(['admin']), transactionFeeController.addTransactionFee); 
router.get("/RentItOut/api/v1/transaction-fees", transactionFeeController.getTransactionFeesList); 
router.get("/RentItOut/api/v1/transaction-fee/:id", transactionFeeController.getTransactionFeeById); 
router.patch("/RentItOut/api/v1/transaction-fee/:id", authMiddleware, roleMiddleware(['admin']), transactionFeeController.updateTransactionFee); 
router.delete("/RentItOut/api/v1/transaction-fee/:id", authMiddleware, roleMiddleware(['admin']), transactionFeeController.deleteTransactionFee); 

router.post('/RentItOut/api/v1/damage-deposit', authMiddleware, roleMiddleware(['admin']), damageDepositsController.addDamageDeposit); 
router.get("/RentItOut/api/v1/damage-deposits", damageDepositsController.getDamageDepositsList); 
router.get("/RentItOut/api/v1/damage-deposit/:id", damageDepositsController.getDamageDepositById); 
router.patch("/RentItOut/api/v1/damage-deposit/:id", authMiddleware, roleMiddleware(['admin']), damageDepositsController.updateDamageDeposit); 
router.delete("/RentItOut/api/v1/damage-deposit/:id", authMiddleware, roleMiddleware(['admin']), damageDepositsController.deleteDamageDeposit); 

router.post('/RentItOut/api/v1/insurance-plan', authMiddleware, roleMiddleware(['admin']), insurancePlansController.addInsurancePlan); 
router.get("/RentItOut/api/v1/insurance-plans", insurancePlansController.getInsurancePlansList); 
router.get("/RentItOut/api/v1/insurance-plan/:id", insurancePlansController.getInsurancePlanById); 
router.patch("/RentItOut/api/v1/insurance-plan/:id", authMiddleware, roleMiddleware(['admin']), insurancePlansController.updateInsurancePlan); 
router.delete("/RentItOut/api/v1/insurance-plan/:id", authMiddleware, roleMiddleware(['admin']), insurancePlansController.deleteInsurancePlan); 

router.post('/RentItOut/api/v1/rental-insurance', authMiddleware, roleMiddleware(['admin']), rentalInsuranceController.addRentalInsurance); 
router.get("/RentItOut/api/v1/rental-insurances", rentalInsuranceController.getRentalInsurancesList); 
router.get("/RentItOut/api/v1/rental-insurance/:id", rentalInsuranceController.getRentalInsuranceById); 
router.patch("/RentItOut/api/v1/rental-insurance/:id", authMiddleware, roleMiddleware(['admin']), rentalInsuranceController.updateRentalInsurance); 
router.delete("/RentItOut/api/v1/rental-insurance/:id", authMiddleware, roleMiddleware(['admin']), rentalInsuranceController.deleteRentalInsurance); 

router.post('/RentItOut/api/v1/recommendation', authMiddleware, roleMiddleware(['user', 'admin']), recommendationsController.addRecommendation); 
router.get("/RentItOut/api/v1/recommendations", recommendationsController.getRecommendationsList); 
router.get("/RentItOut/api/v1/recommendation/:id", recommendationsController.getRecommendationById); 
router.patch("/RentItOut/api/v1/recommendation/:id", authMiddleware, roleMiddleware(['admin']), recommendationsController.updateRecommendation); 
router.delete("/RentItOut/api/v1/recommendation/:id", authMiddleware, roleMiddleware(['admin']), recommendationsController.deleteRecommendation); 

router.post('/RentItOut/api/v1/rating', authMiddleware, roleMiddleware(['user']), ratingsController.addRating); 
router.get("/RentItOut/api/v1/ratings", ratingsController.getRatingsList); 
router.get("/RentItOut/api/v1/rating/:id", ratingsController.getRatingById); 
router.patch("/RentItOut/api/v1/rating/:id", authMiddleware, roleMiddleware(['user']), ratingsController.updateRating); 
router.delete("/RentItOut/api/v1/rating/:id", authMiddleware, roleMiddleware(['admin']), ratingsController.deleteRating); 

router.get("/RentItOut/api/v1/recent-views", authMiddleware, roleMiddleware(['user', 'admin']), recentViewsController.getRecentViewsList); 
router.post("/RentItOut/api/v1/recent-view", authMiddleware, roleMiddleware(['user']), recentViewsController.addRecentView); 
router.delete("/RentItOut/api/v1/recent-view/:id", authMiddleware, roleMiddleware(['user']), recentViewsController.deleteRecentView); 

module.exports = router;

