const db = require('../../utils/db-connection');

const DamageDeposit = {};

// Add a new DamageDeposit
DamageDeposit.addDamageDeposit = (newDamageDeposit, result) => {
    db.query('INSERT INTO damage_deposits SET ?', newDamageDeposit, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newDamageDeposit });
    });
};


// Get the list of all damage_deposits
DamageDeposit.getDamageDepositsList = (result) => {
    db.query('SELECT * FROM damage_deposits', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of damage_deposits by DamageDepositID
DamageDeposit.getDamageDepositById = (DamageDepositID, result) => {
    db.query('SELECT * FROM damage_deposits WHERE id = ?', [DamageDepositID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an damage_deposit
DamageDeposit.updateDamageDeposit = (DamageDepositID, Data, result) => {
        db.query('SELECT * FROM damage_deposits WHERE id = ?', [DamageDepositID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
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
                console.error('Error updating record:', err);
                result(err, null);
                return;
            }
            console.log('Record updated successfully');
            result(null, res);
        });
    });
};

// Delete an damage_deposits
DamageDeposit.deleteDamageDeposit = (DamageDepositID, result) => {
    db.query('DELETE FROM damage_deposits WHERE id = ?', [DamageDepositID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = DamageDeposit;