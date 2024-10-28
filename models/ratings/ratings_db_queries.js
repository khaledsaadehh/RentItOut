const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); 

const Rating = {};

// Add a new Rating
Rating.addRating = (newRating, result) => {
    db.query('INSERT INTO ratings SET ?', newRating, (err, res) => {
        if (err) {
            logger.error(`Error adding Rating: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New Rating added successfully', { newRating });
        result(null, { ...newRating });
    });
};

// Get the list of all ratings
Rating.getRatingsList = (result) => {
    db.query('SELECT * FROM ratings', (err, res) => {
        if (err) {
            logger.error(`Error fetching Ratings list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched Ratings list successfully');
        result(null, res);
    });
};

// Get the Rating by ID
Rating.getRatingById = (RatingID, result) => {
    db.query('SELECT * FROM ratings WHERE id = ?', [RatingID], (err, res) => {
        if (err) {
            logger.error(`Error fetching Rating with ID ${RatingID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched Rating by ID ${RatingID} successfully`);
        result(null, res);
    });
};

// Update a Rating
Rating.updateRating = (RatingID, Data, result) => {
    db.query('SELECT * FROM ratings WHERE id = ?', [RatingID], (err, res) => {
        if (err) {
            logger.error(`Error finding Rating with ID ${RatingID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`Rating with ID ${RatingID} not found for update`);
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
                logger.error(`Error updating Rating with ID ${RatingID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated Rating with ID ${RatingID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a Rating
Rating.deleteRating = (RatingID, result) => {
    db.query('DELETE FROM ratings WHERE id = ?', [RatingID], (err, res) => {
        if (err) {
            logger.error(`Error deleting Rating with ID ${RatingID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted Rating with ID ${RatingID} successfully`);
        result(null, res);
    });
};

module.exports = Rating;
