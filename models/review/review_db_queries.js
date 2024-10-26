const db = require('../../utils/db-connection');

const Review = {};

// Add a new Review
Review.addReview = (newReview, result) => {
    db.query('INSERT INTO reviews SET ?', newReview, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newReview });
    });
};


// Get the list of all reviews
Review.getReviewsList = (result) => {
    db.query('SELECT * FROM reviews', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of reviews by ReviewID
Review.getReviewById = (ReviewID, result) => {
    db.query('SELECT * FROM reviews WHERE id = ?', [ReviewID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an item
Review.updateReview = (ReviewID, Data, result) => {
        db.query('SELECT * FROM reviews WHERE id = ?', [ReviewID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE reviews SET ';
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
        updateData.push(ReviewID);
        
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

// Delete an reviews
Review.deleteReview = (ReviewID, result) => {
    db.query('DELETE FROM reviews WHERE id = ?', [ReviewID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Review;