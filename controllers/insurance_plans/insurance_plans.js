const InsurancePlan = require('../../models/insurance_plans/insurance_plans_db_queries');

const addInsurancePlan = (req, res) => {
    const newInsurancePlan = req.body;
    InsurancePlan.addInsurancePlan(newInsurancePlan, (err, data) => {
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


const getInsurancePlansList = (req, res) => {
    InsurancePlan.getInsurancePlansList((err, data) => {
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


const getInsurancePlanById = (req, res) => {
    InsurancePlan.getInsurancePlanById(req.params.id, (err, data) => {
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


const updateInsurancePlan = (req, res) => {
    InsurancePlan.updateInsurancePlan(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific InsurancePlan.'
            });
        } else {
            res.send({Message: `InsurancePlan with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteInsurancePlan = (req, res) => {
    InsurancePlan.deleteInsurancePlan(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific InsurancePlan.'
            });
        } else {
            res.send({Message: `InsurancePlan with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addInsurancePlan,
    getInsurancePlanById,
    getInsurancePlansList,
    updateInsurancePlan,
    deleteInsurancePlan
};