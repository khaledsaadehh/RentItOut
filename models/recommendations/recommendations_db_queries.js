const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); // Adjust the path if necessary

const Recommendation = {};

// Add a new Recommendation
Recommendation.addRecommendation = (newRecommendation, result) => {
    db.query('INSERT INTO recommendations SET ?', newRecommendation, (err, res) => {
        if (err) {
            logger.error(`Error adding Recommendation: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New Recommendation added successfully', { newRecommendation });
        result(null, { ...newRecommendation });
    });
};

// Get the list of all recommendations
Recommendation.getRecommendationsList = (result) => {
    db.query('SELECT * FROM recommendations', (err, res) => {
        if (err) {
            logger.error(`Error fetching Recommendations list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched Recommendations list successfully');
        result(null, res);
    });
};

// Get Recommendation by ID
Recommendation.getRecommendationById = (RecommendationID, result) => {
    db.query('SELECT * FROM recommendations WHERE id = ?', [RecommendationID], (err, res) => {
        if (err) {
            logger.error(`Error fetching Recommendation with ID ${RecommendationID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched Recommendation by ID ${RecommendationID} successfully`);
        result(null, res);
    });
};

// Update a Recommendation
Recommendation.updateRecommendation = (RecommendationID, Data, result) => {
    db.query('SELECT * FROM recommendations WHERE id = ?', [RecommendationID], (err, res) => {
        if (err) {
            logger.error(`Error finding Recommendation with ID ${RecommendationID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`Recommendation with ID ${RecommendationID} not found for update`);
            result({ kind: "not_found" }, null);
            return;
        }

        let updateQuery = 'UPDATE recommendations SET ';
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
        updateData.push(RecommendationID);

        db.query(updateQuery, updateData, (err, res) => {
            if (err) {
                logger.error(`Error updating Recommendation with ID ${RecommendationID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated Recommendation with ID ${RecommendationID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a Recommendation
Recommendation.deleteRecommendation = (RecommendationID, result) => {
    db.query('DELETE FROM recommendations WHERE id = ?', [RecommendationID], (err, res) => {
        if (err) {
            logger.error(`Error deleting Recommendation with ID ${RecommendationID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted Recommendation with ID ${RecommendationID} successfully`);
        result(null, res);
    });
};

module.exports = Recommendation;
