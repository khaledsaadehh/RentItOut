const Logistic = require('../../models/logistic/logistic_db_queries');

const addLogistic = (req, res) => {
    const newLogistic = req.body;
    Logistic.addLogistic(newLogistic, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while adding new Logistic'
            });
        } else {
            res.send(data);
        }
    });
};


const getLogisticsList = (req, res) => {
    Logistic.getLogisticsList((err, data) => {
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


const getLogisticById = (req, res) => {
    Logistic.getLogisticById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving a specific logistic.'
            });
        } else {
            res.send(data);
        }
    });
};


const updateLogistic = (req, res) => {
    Logistic.updateLogistic(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific Logistic.'
            });
        } else {
            res.send({Message: `Logistic with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteLogistic = (req, res) => {
    Logistic.deleteLogistic(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific Item.'
            });
        } else {
            res.send({Message: `Logistic with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addLogistic,
    getLogisticById,
    getLogisticsList,
    updateLogistic,
    deleteLogistic
};