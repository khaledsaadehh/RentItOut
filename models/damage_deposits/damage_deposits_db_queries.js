const db = require('../../utils/db-connection');
const logger = require("../../utils/logger");

const DamageDeposit = {};

// Add a new DamageDeposit
DamageDeposit.addDamageDeposit = (newDamageDeposit, result) => {
    db.query('INSERT INTO damage_deposits SET ?', newDamageDeposit, (err, res) => {
        if (err) {
            logger.error(`Error adding DamageDeposit: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New DamageDeposit added successfully', { newDamageDeposit });
        result(null, { ...newDamageDeposit });
    });
};


// Get the list of all damage_deposits
DamageDeposit.getDamageDepositsList = (result) => {
    db.query('SELECT * FROM damage_deposits', (err, res) => {
        if (err) {
            logger.error(`Error fetching DamageDeposits list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched DamageDeposits list successfully');
        result(null, res);
    });
};


// Get the list of damage_deposits by DamageDepositID
DamageDeposit.getDamageDepositById = (DamageDepositID, result) => {
    db.query('SELECT * FROM damage_deposits WHERE id = ?', [DamageDepositID], (err, res) => {
        if (err) {
            logger.error(`Error fetching DamageDeposit with ID ${DamageDepositID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched DamageDeposit by ID ${DamageDepositID} successfully`);
        result(null, res);
    });
};


// Update an damage_deposit
DamageDeposit.updateDamageDeposit = (DamageDepositID, Data, result) => {
        db.query('SELECT * FROM damage_deposits WHERE id = ?', [DamageDepositID], (err, res) => {
        if (err) {
            logger.error(`Error finding DamageDeposit with ID ${DamageDepositID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`DamageDeposit with ID ${DamageDepositID} not found for update`);
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE damage_deposits SET ';
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
        updateData.push(DamageDepositID);
        
        db.query(updateQuery, updateData, (err, res) => {
            if (err) {
                logger.error(`Error updating DamageDeposit with ID ${DamageDepositID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated DamageDeposit with ID ${DamageDepositID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete an damage_deposits
DamageDeposit.deleteDamageDeposit = (DamageDepositID, result) => {
    db.query('DELETE FROM damage_deposits WHERE id = ?', [DamageDepositID], (err, res) => {
        if (err) {
            logger.error(`Error deleting DamageDeposit with ID ${DamageDepositID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted DamageDeposit with ID ${DamageDepositID} successfully`);
        result(null, res);
    });
};

module.exports = DamageDeposit;