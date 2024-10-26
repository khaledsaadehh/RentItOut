const db = require('../../utils/db-connection');

const Logistic = {};

// Add a new Logistic
Logistic.addLogistic = (newLogistic, result) => {
    db.query('INSERT INTO logistics SET ?', newLogistic, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newLogistic });
    });
};


// Get the list of all Logistics
Logistic.getLogisticsList = (result) => {
    db.query('SELECT * FROM logistics', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of logistics by LogisticID
Logistic.getLogisticById = (LogisticID, result) => {
    db.query('SELECT * FROM logistics WHERE id = ?', [LogisticID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an Logistic
Logistic.updateLogistic = (LogisticID, Data, result) => {
        db.query('SELECT * FROM logistics WHERE id = ?', [LogisticID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE logistics SET ';
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
        updateData.push(LogisticID);
        
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

// Delete a Logistic
Logistic.deleteLogistic = (LogisticID, result) => {
    db.query('DELETE FROM logistics WHERE id = ?', [LogisticID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Logistic;