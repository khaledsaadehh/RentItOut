const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); // Adjust the path if necessary

const Payment = {};

// Add a new Payment
Payment.addPayment = (newPayment, result) => {
    db.query('INSERT INTO payments SET ?', newPayment, (err, res) => {
        if (err) {
            logger.error(`Error adding Payment: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New Payment added successfully', { newPayment });
        result(null, { ...newPayment });
    });
};

// Get the list of all payments
Payment.getPaymentsList = (result) => {
    db.query('SELECT * FROM payments', (err, res) => {
        if (err) {
            logger.error(`Error fetching Payments list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched Payments list successfully');
        result(null, res);
    });
};

// Get the Payment by ID
Payment.getPaymentById = (PaymentID, result) => {
    db.query('SELECT * FROM payments WHERE id = ?', [PaymentID], (err, res) => {
        if (err) {
            logger.error(`Error fetching Payment with ID ${PaymentID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched Payment by ID ${PaymentID} successfully`);
        result(null, res);
    });
};

// Update a Payment
Payment.updatePayment = (PaymentID, Data, result) => {
    db.query('SELECT * FROM payments WHERE id = ?', [PaymentID], (err, res) => {
        if (err) {
            logger.error(`Error finding Payment with ID ${PaymentID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`Payment with ID ${PaymentID} not found for update`);
            result({ kind: "not_found" }, null);
            return;
        }

        let updateQuery = 'UPDATE payments SET ';
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
        updateData.push(PaymentID);

        db.query(updateQuery, updateData, (err, res) => {
            if (err) {
                logger.error(`Error updating Payment with ID ${PaymentID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated Payment with ID ${PaymentID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a Payment
Payment.deletePayment = (PaymentID, result) => {
    db.query('DELETE FROM payments WHERE id = ?', [PaymentID], (err, res) => {
        if (err) {
            logger.error(`Error deleting Payment with ID ${PaymentID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted Payment with ID ${PaymentID} successfully`);
        result(null, res);
    });
};

module.exports = Payment;
