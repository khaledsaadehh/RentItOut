const Review = require('../../models/review/review_db_queries');

const addReview = (req, res) => {
    const newReview = req.body;
    Review.addReview(newReview, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while adding new Review'
            });
        } else {
            res.send(data);
        }
    });
};


const getReviewsList = (req, res) => {
    Review.getReviewsList((err, data) => {
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


const getReviewById = (req, res) => {
    Review.getReviewById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving a specific Review.'
            });
        } else {
            res.send(data);
        }
    });
};


const updateReview = (req, res) => {
    Review.updateReview(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific Review.'
            });
        } else {
            res.send({Message: `Review with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteReview = (req, res) => {
    Review.deleteReview(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific Review.'
            });
        } else {
            res.send({Message: `Review with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addReview,
    getReviewById,
    getReviewsList,
    updateReview,
    deleteReview
};