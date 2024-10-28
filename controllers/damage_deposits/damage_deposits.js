const DamageDeposit = require('../../models/damage_deposits/damage_deposits_db_queries');

const addDamageDeposit = (req, res) => {
    const newDamageDeposit = req.body;
    DamageDeposit.addDamageDeposit(newDamageDeposit, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while adding new item'
            });
        } else {
            res.send(data);
        }
    });
};


const getDamageDepositsList = (req, res) => {
    DamageDeposit.getDamageDepositsList((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieve the data.'
            });
        } else {
            res.send(data);
        }
    });
};


const getDamageDepositById = (req, res) => {
    DamageDeposit.getDamageDepositById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving a specific item.'
            });
        } else {
            res.send(data);
        }
    });
};


const updateDamageDeposit = (req, res) => {
    DamageDeposit.updateDamageDeposit(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific DamageDeposit.'
            });
        } else {
            res.send({Message: `DamageDeposit with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteDamageDeposit = (req, res) => {
    DamageDeposit.deleteDamageDeposit(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific DamageDeposit.'
            });
        } else {
            res.send({Message: `DamageDeposit with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addDamageDeposit,
    getDamageDepositById,
    getDamageDepositsList,
    updateDamageDeposit,
    deleteDamageDeposit
};