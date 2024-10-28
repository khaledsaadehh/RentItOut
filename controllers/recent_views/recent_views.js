const RecentView = require('../../models/recent_views/recent_views_db_queries');

const addRecentView = (req, res) => {
    const newRecentView = req.body;
    RecentView.addRecentView(newRecentView, (err, data) => {
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


const getRecentViewsList = (req, res) => {
    RecentView.getRecentViewsList((err, data) => {
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


const getRecentViewById = (req, res) => {
    RecentView.getRecentViewById(req.params.id, (err, data) => {
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


const updateRecentView = (req, res) => {
    RecentView.updateRecentView(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific RecentView.'
            });
        } else {
            res.send({Message: `RecentView with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteRecentView = (req, res) => {
    RecentView.deleteRecentView(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific RecentView.'
            });
        } else {
            res.send({Message: `RecentView with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addRecentView,
    getRecentViewById,
    getRecentViewsList,
    updateRecentView,
    deleteRecentView
};