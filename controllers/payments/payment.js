const Payment = require('../../models/payment/payment_db_queries');

const addPayment = (req, res) => {
    const newPayment = req.body;
    Payment.addPayment(newPayment, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while adding new Payment'
            });
        } else {
            res.send(data);
        }
    });
};


const getPaymentsList = (req, res) => {
    Payment.getPaymentsList((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieve the data.'
            });
        } else {
            res.send(data);
        }
    });
};


const getPaymentById = (req, res) => {
    Payment.getPaymentById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving a specific Payment.'
            });
        } else {
            res.send(data);
        }
    });
};


const updatePayment = (req, res) => {
    Payment.updatePayment(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific Payment.'
            });
        } else {
            res.send({Message: `Payment with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deletePayment = (req, res) => {
    Payment.deletePayment(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific Payment.'
            });
        } else {
            res.send({Message: `Payment with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addPayment,
    getPaymentById,
    getPaymentsList,
    updatePayment,
    deletePayment
};