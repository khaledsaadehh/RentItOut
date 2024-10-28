const db = require('../../utils/db-connection');

const Rating = {};

// Add a new Rating
Rating.addRating = (newRating, result) => {
    db.query('INSERT INTO ratings SET ?', newRating, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newRating });
    });
};


// Get the list of all ratings
Rating.getRatingsList = (result) => {
    db.query('SELECT * FROM ratings', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of ratings by RatingID
Rating.getRatingById = (RatingID, result) => {
    db.query('SELECT * FROM ratings WHERE id = ?', [RatingID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an rating
Rating.updateRating = (RatingID, Data, result) => {
        db.query('SELECT * FROM ratings WHERE id = ?', [RatingID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE ratings SET ';
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
        updateData.push(RatingID);
        
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

// Delete an ratings
Rating.deleteRating = (RatingID, result) => {
    db.query('DELETE FROM ratings WHERE id = ?', [RatingID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Rating;