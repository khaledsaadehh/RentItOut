const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); // Adjust the path if necessary

const TransactionFee = {};

// Add a new TransactionFee
TransactionFee.addTransactionFee = (newTransactionFee, result) => {
    db.query('INSERT INTO transaction_fees SET ?', newTransactionFee, (err, res) => {
        if (err) {
            logger.error(`Error adding Transaction Fee: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New Transaction Fee added successfully', { newTransactionFee });
        result(null, { ...newTransactionFee });
    });
};

// Get the list of all transaction_fees
TransactionFee.getTransactionFeesList = (result) => {
    db.query('SELECT * FROM transaction_fees', (err, res) => {
        if (err) {
            logger.error(`Error fetching Transaction Fees list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched Transaction Fees list successfully');
        result(null, res);
    });
};

// Get Transaction Fee by ID
TransactionFee.getTransactionFeeById = (TransactionFeeID, result) => {
    db.query('SELECT * FROM transaction_fees WHERE id = ?', [TransactionFeeID], (err, res) => {
        if (err) {
            logger.error(`Error fetching Transaction Fee with ID ${TransactionFeeID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched Transaction Fee by ID ${TransactionFeeID} successfully`);
        result(null, res);
    });
};

// Update a Transaction Fee
TransactionFee.updateTransactionFee = (TransactionFeeID, Data, result) => {
    db.query('SELECT * FROM transaction_fees WHERE id = ?', [TransactionFeeID], (err, res) => {
        if (err) {
            logger.error(`Error finding Transaction Fee with ID ${TransactionFeeID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`Transaction Fee with ID ${TransactionFeeID} not found for update`);
            result({ kind: "not_found" }, null);
            return;
        }

        let updateQuery = 'UPDATE transaction_fees SET ';
        let updateData = [];
        Object.keys(Data).forEach((key, index) => {
            if (Data[key] !== '') {
                updateQuery += `${key} = ?`;
                updateData.push(Data[key]);
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ' WHERE id = ?';
        updateData.push(TransactionFeeID);

        db.query(updateQuery, updateData, (err, res) => {
            if (err) {
                logger.error(`Error updating Transaction Fee with ID ${TransactionFeeID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated Transaction Fee with ID ${TransactionFeeID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a Transaction Fee
TransactionFee.deleteTransactionFee = (TransactionFeeID, result) => {
    db.query('DELETE FROM transaction_fees WHERE id = ?', [TransactionFeeID], (err, res) => {
        if (err) {
            logger.error(`Error deleting Transaction Fee with ID ${TransactionFeeID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted Transaction Fee with ID ${TransactionFeeID} successfully`);
        result(null, res);
    });
};

module.exports = TransactionFee;
