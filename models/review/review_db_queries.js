const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); // Adjust the path if necessary

const Review = {};

// Add a new Review
Review.addReview = (newReview, result) => {
    db.query('INSERT INTO reviews SET ?', newReview, (err, res) => {
        if (err) {
            logger.error(`Error adding Review: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New Review added successfully', { newReview });
        result(null, { ...newReview });
    });
};

// Get the list of all reviews
Review.getReviewsList = (result) => {
    db.query('SELECT * FROM reviews', (err, res) => {
        if (err) {
            logger.error(`Error fetching Reviews list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched Reviews list successfully');
        result(null, res);
    });
};

// Get Review by ID
Review.getReviewById = (ReviewID, result) => {
    db.query('SELECT * FROM reviews WHERE id = ?', [ReviewID], (err, res) => {
        if (err) {
            logger.error(`Error fetching Review with ID ${ReviewID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched Review by ID ${ReviewID} successfully`);
        result(null, res);
    });
};

// Update a Review
Review.updateReview = (ReviewID, Data, result) => {
    db.query('SELECT * FROM reviews WHERE id = ?', [ReviewID], (err, res) => {
        if (err) {
            logger.error(`Error finding Review with ID ${ReviewID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`Review with ID ${ReviewID} not found for update`);
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
                logger.error(`Error updating Review with ID ${ReviewID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated Review with ID ${ReviewID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a Review
Review.deleteReview = (ReviewID, result) => {
    db.query('DELETE FROM reviews WHERE id = ?', [ReviewID], (err, res) => {
        if (err) {
            logger.error(`Error deleting Review with ID ${ReviewID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted Review with ID ${ReviewID} successfully`);
        result(null, res);
    });
};

module.exports = Review;
