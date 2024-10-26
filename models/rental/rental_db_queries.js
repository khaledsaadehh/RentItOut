const db = require('../../utils/db-connection');

const Rental = {};

// Add a new Rental
Rental.addRental = (newRental, result) => {
    db.query('INSERT INTO rentals SET ?', newRental, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newRental });
    });
};


// Get the list of all rentals
Rental.getRentalsList = (result) => {
    db.query('SELECT * FROM rentals', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of rentals by RentalID
Rental.getRentalById = (RentalID, result) => {
    db.query('SELECT * FROM rentals WHERE id = ?', [RentalID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an rental
Rental.updateRental = (RentalID, Data, result) => {
        db.query('SELECT * FROM rentals WHERE id = ?', [RentalID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE rentals SET ';
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
        updateData.push(RentalID);
        
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

// Delete an rentals
Rental.deleteRental = (RentalID, result) => {
    db.query('DELETE FROM rentals WHERE id = ?', [RentalID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Rental;