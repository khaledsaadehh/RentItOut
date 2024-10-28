const db = require('../../utils/db-connection');

const TransactionFee = {};

// Add a new TransactionFee
TransactionFee.addTransactionFee = (newTransactionFee, result) => {
    db.query('INSERT INTO transaction_fees SET ?', newTransactionFee, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newTransactionFee });
    });
};


// Get the list of all transaction_fees
TransactionFee.getTransactionFeesList = (result) => {
    db.query('SELECT * FROM transaction_fees', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of transaction_fees by TransactionFeeID
TransactionFee.getTransactionFeeById = (TransactionFeeID, result) => {
    db.query('SELECT * FROM transaction_fees WHERE id = ?', [TransactionFeeID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an transaction_fee
TransactionFee.updateTransactionFee = (TransactionFeeID, Data, result) => {
        db.query('SELECT * FROM transaction_fees WHERE id = ?', [TransactionFeeID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
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
                console.error('Error updating record:', err);
                result(err, null);
                return;
            }
            console.log('Record updated successfully');
            result(null, res);
        });
    });
};

// Delete an transaction_fees
TransactionFee.deleteTransactionFee = (TransactionFeeID, result) => {
    db.query('DELETE FROM transaction_fees WHERE id = ?', [TransactionFeeID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = TransactionFee;