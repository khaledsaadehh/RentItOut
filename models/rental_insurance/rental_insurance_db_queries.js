const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); // Adjust the path if necessary

const RentalInsurance = {};

// Add a new RentalInsurance
RentalInsurance.addRentalInsurance = (newRentalInsurance, result) => {
    db.query('INSERT INTO rental_insurance SET ?', newRentalInsurance, (err, res) => {
        if (err) {
            logger.error(`Error adding RentalInsurance: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New RentalInsurance added successfully', { newRentalInsurance });
        result(null, { ...newRentalInsurance });
    });
};

// Get the list of all rental insurance records
RentalInsurance.getRentalInsurancesList = (result) => {
    db.query('SELECT * FROM rental_insurance', (err, res) => {
        if (err) {
            logger.error(`Error fetching RentalInsurances list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched RentalInsurances list successfully');
        result(null, res);
    });
};

// Get RentalInsurance by ID
RentalInsurance.getRentalInsuranceById = (RentalInsuranceID, result) => {
    db.query('SELECT * FROM rental_insurance WHERE id = ?', [RentalInsuranceID], (err, res) => {
        if (err) {
            logger.error(`Error fetching RentalInsurance with ID ${RentalInsuranceID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched RentalInsurance by ID ${RentalInsuranceID} successfully`);
        result(null, res);
    });
};

// Update a RentalInsurance
RentalInsurance.updateRentalInsurance = (RentalInsuranceID, Data, result) => {
    db.query('SELECT * FROM rental_insurance WHERE id = ?', [RentalInsuranceID], (err, res) => {
        if (err) {
            logger.error(`Error finding RentalInsurance with ID ${RentalInsuranceID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`RentalInsurance with ID ${RentalInsuranceID} not found for update`);
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
                logger.error(`Error updating RentalInsurance with ID ${RentalInsuranceID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated RentalInsurance with ID ${RentalInsuranceID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a RentalInsurance
RentalInsurance.deleteRentalInsurance = (RentalInsuranceID, result) => {
    db.query('DELETE FROM rental_insurance WHERE id = ?', [RentalInsuranceID], (err, res) => {
        if (err) {
            logger.error(`Error deleting RentalInsurance with ID ${RentalInsuranceID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted RentalInsurance with ID ${RentalInsuranceID} successfully`);
        result(null, res);
    });
};

module.exports = RentalInsurance;
