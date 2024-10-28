const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); // Adjust the path if necessary

const Logistic = {};

// Add a new Logistic
Logistic.addLogistic = (newLogistic, result) => {
    db.query('INSERT INTO logistics SET ?', newLogistic, (err, res) => {
        if (err) {
            logger.error(`Error adding Logistic: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New Logistic added successfully', { newLogistic });
        result(null, { ...newLogistic });
    });
};

// Get the list of all Logistics
Logistic.getLogisticsList = (result) => {
    db.query('SELECT * FROM logistics', (err, res) => {
        if (err) {
            logger.error(`Error fetching Logistics list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched Logistics list successfully');
        result(null, res);
    });
};

// Get the Logistic by ID
Logistic.getLogisticById = (LogisticID, result) => {
    db.query('SELECT * FROM logistics WHERE id = ?', [LogisticID], (err, res) => {
        if (err) {
            logger.error(`Error fetching Logistic with ID ${LogisticID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched Logistic by ID ${LogisticID} successfully`);
        result(null, res);
    });
};

// Update a Logistic
Logistic.updateLogistic = (LogisticID, Data, result) => {
    db.query('SELECT * FROM logistics WHERE id = ?', [LogisticID], (err, res) => {
        if (err) {
            logger.error(`Error finding Logistic with ID ${LogisticID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`Logistic with ID ${LogisticID} not found for update`);
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
                logger.error(`Error updating Logistic with ID ${LogisticID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated Logistic with ID ${LogisticID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a Logistic
Logistic.deleteLogistic = (LogisticID, result) => {
    db.query('DELETE FROM logistics WHERE id = ?', [LogisticID], (err, res) => {
        if (err) {
            logger.error(`Error deleting Logistic with ID ${LogisticID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted Logistic with ID ${LogisticID} successfully`);
        result(null, res);
    });
};

module.exports = Logistic;
