const Rental = require('../../models/rental/rental_db_queries');

const addRental = (req, res) => {
    const newRental = req.body;
    Rental.addRental(newRental, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while adding new Rental'
            });
        } else {
            res.send(data);
        }
    });
};


const getRentalsList = (req, res) => {
    Rental.getRentalsList((err, data) => {
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


const getRentalById = (req, res) => {
    Rental.getRentalById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving a specific Rental.'
            });
        } else {
            res.send(data);
        }
    });
};


const updateRental = (req, res) => {
    Rental.updateRental(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific Rental.'
            });
        } else {
            res.send({Message: `Rental with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteRental = (req, res) => {
    Rental.deleteRental(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific Rental.'
            });
        } else {
            res.send({Message: `Rental with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addRental,
    getRentalById,
    getRentalsList,
    updateRental,
    deleteRental
};