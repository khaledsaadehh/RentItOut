const db = require('../../utils/db-connection');
const logger = require("../../utils/logger");

const InsurancePlan = {};

// Add a new InsurancePlan
InsurancePlan.addInsurancePlan = (newInsurancePlan, result) => {
    db.query('INSERT INTO insurance_plans SET ?', newInsurancePlan, (err, res) => {
        if (err) {
            logger.error(`Error adding InsurancePlan: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New InsurancePlan added successfully', { newInsurancePlan });
        result(null, { ...newInsurancePlan });
    });
};


// Get the list of all insurance_plans
InsurancePlan.getInsurancePlansList = (result) => {
    db.query('SELECT * FROM insurance_plans', (err, res) => {
        if (err) {
            logger.error(`Error fetching InsurancePlans list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched InsurancePlans list successfully');
        result(null, res);
    });
};


// Get the list of insurance_plans by InsurancePlanID
InsurancePlan.getInsurancePlanById = (InsurancePlanID, result) => {
    db.query('SELECT * FROM insurance_plans WHERE id = ?', [InsurancePlanID], (err, res) => {
        if (err) {
            logger.error(`Error fetching InsurancePlan with ID ${InsurancePlanID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched InsurancePlan by ID ${InsurancePlanID} successfully`);
        result(null, res);
    });
};


// Update an insurance_plan
InsurancePlan.updateInsurancePlan = (InsurancePlanID, Data, result) => {
        db.query('SELECT * FROM insurance_plans WHERE id = ?', [InsurancePlanID], (err, res) => {
        if (err) {
            logger.error(`Error finding InsurancePlan with ID ${InsurancePlanID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`InsurancePlan with ID ${InsurancePlanID} not found for update`);
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE insurance_plans SET ';
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
        updateData.push(InsurancePlanID);
        
        db.query(updateQuery, updateData, (err, res) => {
            if (err) {
                logger.error(`Error updating InsurancePlan with ID ${InsurancePlanID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated InsurancePlan with ID ${InsurancePlanID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete an insurance_plans
InsurancePlan.deleteInsurancePlan = (InsurancePlanID, result) => {
    db.query('DELETE FROM insurance_plans WHERE id = ?', [InsurancePlanID], (err, res) => {
        if (err) {
            logger.error(`Error deleting InsurancePlan with ID ${InsurancePlanID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted InsurancePlan with ID ${InsurancePlanID} successfully`);
        result(null, res);
    });
};

module.exports = InsurancePlan;