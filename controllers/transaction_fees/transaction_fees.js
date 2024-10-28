const TransactionFee = require('../../models/transaction_fees/transaction_fees_db_queries');

const addTransactionFee = (req, res) => {
    const newTransactionFee = req.body;
    TransactionFee.addTransactionFee(newTransactionFee, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while adding new item'
            });
        } else {
            res.send(data);
        }
    });
};


const getTransactionFeesList = (req, res) => {
    TransactionFee.getTransactionFeesList((err, data) => {
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


const getTransactionFeeById = (req, res) => {
    TransactionFee.getTransactionFeeById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving a specific item.'
            });
        } else {
            res.send(data);
        }
    });
};


const updateTransactionFee = (req, res) => {
    TransactionFee.updateTransactionFee(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific TransactionFee.'
            });
        } else {
            res.send({Message: `TransactionFee with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteTransactionFee = (req, res) => {
    TransactionFee.deleteTransactionFee(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific TransactionFee.'
            });
        } else {
            res.send({Message: `TransactionFee with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addTransactionFee,
    getTransactionFeeById,
    getTransactionFeesList,
    updateTransactionFee,
    deleteTransactionFee
};