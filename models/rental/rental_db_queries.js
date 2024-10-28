const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); // Adjust the path if necessary

const Rental = {};

// Add a new Rental
Rental.addRental = (newRental, result) => {
    db.query('INSERT INTO rentals SET ?', newRental, (err, res) => {
        if (err) {
            logger.error(`Error adding Rental: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New Rental added successfully', { newRental });
        result(null, { ...newRental });
    });
};

// Get the list of all rentals
Rental.getRentalsList = (result) => {
    db.query('SELECT * FROM rentals', (err, res) => {
        if (err) {
            logger.error(`Error fetching Rentals list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched Rentals list successfully');
        result(null, res);
    });
};

// Get Rental by ID
Rental.getRentalById = (RentalID, result) => {
    db.query('SELECT * FROM rentals WHERE id = ?', [RentalID], (err, res) => {
        if (err) {
            logger.error(`Error fetching Rental with ID ${RentalID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched Rental by ID ${RentalID} successfully`);
        result(null, res);
    });
};

// Update a Rental
Rental.updateRental = (RentalID, Data, result) => {
    db.query('SELECT * FROM rentals WHERE id = ?', [RentalID], (err, res) => {
        if (err) {
            logger.error(`Error finding Rental with ID ${RentalID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`Rental with ID ${RentalID} not found for update`);
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
                logger.error(`Error updating Rental with ID ${RentalID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated Rental with ID ${RentalID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a Rental
Rental.deleteRental = (RentalID, result) => {
    db.query('DELETE FROM rentals WHERE id = ?', [RentalID], (err, res) => {
        if (err) {
            logger.error(`Error deleting Rental with ID ${RentalID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted Rental with ID ${RentalID} successfully`);
        result(null, res);
    });
};

module.exports = Rental;
