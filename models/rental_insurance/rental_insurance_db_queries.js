const db = require('../../utils/db-connection');

const RentalInsurance = {};

// Add a new RentalInsurance
RentalInsurance.addRentalInsurance = (newRentalInsurance, result) => {
    db.query('INSERT INTO rental_insurance SET ?', newRentalInsurance, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newRentalInsurance });
    });
};


// Get the list of all rental_insurance
RentalInsurance.getRentalInsurancesList = (result) => {
    db.query('SELECT * FROM rental_insurance', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of rental_insurance by RentalInsuranceID
RentalInsurance.getRentalInsuranceById = (RentalInsuranceID, result) => {
    db.query('SELECT * FROM rental_insurance WHERE id = ?', [RentalInsuranceID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an rental_insurance
RentalInsurance.updateRentalInsurance = (RentalInsuranceID, Data, result) => {
        db.query('SELECT * FROM rental_insurance WHERE id = ?', [RentalInsuranceID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE rental_insurance SET ';
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
        updateData.push(RentalInsuranceID);
        
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

// Delete an rental_insurance
RentalInsurance.deleteRentalInsurance = (RentalInsuranceID, result) => {
    db.query('DELETE FROM rental_insurance WHERE id = ?', [RentalInsuranceID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = RentalInsurance;