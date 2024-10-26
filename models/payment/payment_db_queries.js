const db = require('../../utils/db-connection');

const Payment = {};

// Add a new Payment
Payment.addPayment = (newPayment, result) => {
    db.query('INSERT INTO payments SET ?', newPayment, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newPayment });
    });
};


// Get the list of all payments
Payment.getPaymentsList = (result) => {
    db.query('SELECT * FROM payments', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of payments by PaymentID
Payment.getPaymentById = (PaymentID, result) => {
    db.query('SELECT * FROM payments WHERE id = ?', [PaymentID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an payments
Payment.updatePayment = (PaymentID, Data, result) => {
        db.query('SELECT * FROM payments WHERE id = ?', [PaymentID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
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
                console.error('Error updating record:', err);
                result(err, null);
                return;
            }
            console.log('Record updated successfully');
            result(null, res);
        });
    });
};

// Delete an payments
Payment.deletePayment = (PaymentID, result) => {
    db.query('DELETE FROM payments WHERE id = ?', [PaymentID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Payment;