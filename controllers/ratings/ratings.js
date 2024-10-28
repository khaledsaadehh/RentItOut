const Rating = require('../../models/ratings/ratings_db_queries');

const addRating = (req, res) => {
    const newRating = req.body;
    Rating.addRating(newRating, (err, data) => {
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


const getRatingsList = (req, res) => {
    Rating.getRatingsList((err, data) => {
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


const getRatingById = (req, res) => {
    Rating.getRatingById(req.params.id, (err, data) => {
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


const updateRating = (req, res) => {
    Rating.updateRating(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific Rating.'
            });
        } else {
            res.send({Message: `Rating with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteRating = (req, res) => {
    Rating.deleteRating(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific Rating.'
            });
        } else {
            res.send({Message: `Rating with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addRating,
    getRatingById,
    getRatingsList,
    updateRating,
    deleteRating
};