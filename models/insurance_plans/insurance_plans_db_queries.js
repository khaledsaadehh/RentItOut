const db = require('../../utils/db-connection');

const InsurancePlan = {};

// Add a new InsurancePlan
InsurancePlan.addInsurancePlan = (newInsurancePlan, result) => {
    db.query('INSERT INTO insurance_plans SET ?', newInsurancePlan, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newInsurancePlan });
    });
};


// Get the list of all insurance_plans
InsurancePlan.getInsurancePlansList = (result) => {
    db.query('SELECT * FROM insurance_plans', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of insurance_plans by InsurancePlanID
InsurancePlan.getInsurancePlanById = (InsurancePlanID, result) => {
    db.query('SELECT * FROM insurance_plans WHERE id = ?', [InsurancePlanID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an insurance_plan
InsurancePlan.updateInsurancePlan = (InsurancePlanID, Data, result) => {
        db.query('SELECT * FROM insurance_plans WHERE id = ?', [InsurancePlanID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
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
                console.error('Error updating record:', err);
                result(err, null);
                return;
            }
            console.log('Record updated successfully');
            result(null, res);
        });
    });
};

// Delete an insurance_plans
InsurancePlan.deleteInsurancePlan = (InsurancePlanID, result) => {
    db.query('DELETE FROM insurance_plans WHERE id = ?', [InsurancePlanID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = InsurancePlan;