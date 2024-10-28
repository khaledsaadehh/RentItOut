const RentalInsurance = require('../../models/rental_insurance/rental_insurance_db_queries');

const addRentalInsurance = (req, res) => {
    const newRentalInsurance = req.body;
    RentalInsurance.addRentalInsurance(newRentalInsurance, (err, data) => {
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


const getRentalInsurancesList = (req, res) => {
    RentalInsurance.getRentalInsurancesList((err, data) => {
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


const getRentalInsuranceById = (req, res) => {
    RentalInsurance.getRentalInsuranceById(req.params.id, (err, data) => {
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


const updateRentalInsurance = (req, res) => {
    RentalInsurance.updateRentalInsurance(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific RentalInsurance.'
            });
        } else {
            res.send({Message: `RentalInsurance with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteRentalInsurance = (req, res) => {
    RentalInsurance.deleteRentalInsurance(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific RentalInsurance.'
            });
        } else {
            res.send({Message: `RentalInsurance with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addRentalInsurance,
    getRentalInsuranceById,
    getRentalInsurancesList,
    updateRentalInsurance,
    deleteRentalInsurance
};