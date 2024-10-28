const Recommendation = require('../../models/recommendations/recommendations_db_queries');

const addRecommendation = (req, res) => {
    const newRecommendation = req.body;
    Recommendation.addRecommendation(newRecommendation, (err, data) => {
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


const getRecommendationsList = (req, res) => {
    Recommendation.getRecommendationsList((err, data) => {
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


const getRecommendationById = (req, res) => {
    Recommendation.getRecommendationById(req.params.id, (err, data) => {
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


const updateRecommendation = (req, res) => {
    Recommendation.updateRecommendation(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific Recommendation.'
            });
        } else {
            res.send({Message: `Recommendation with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteRecommendation = (req, res) => {
    Recommendation.deleteRecommendation(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific Recommendation.'
            });
        } else {
            res.send({Message: `Recommendation with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addRecommendation,
    getRecommendationById,
    getRecommendationsList,
    updateRecommendation,
    deleteRecommendation
};