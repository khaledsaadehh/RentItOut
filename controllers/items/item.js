const Item = require('../../models/item/item_db_queries');

const addItem = (req, res) => {
    const newItem = req.body;
    Item.addItem(newItem, (err, data) => {
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


const getItemsList = (req, res) => {
    Item.getItemsList((err, data) => {
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


const getItemById = (req, res) => {
    Item.getItemById(req.params.id, (err, data) => {
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


const updateItem = (req, res) => {
    Item.updateItem(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update a specific Item.'
            });
        } else {
            res.send({Message: `Item with id = ${req.params.id} Updated Successfully!! `});

        }
    });
};


const deleteItem = (req, res) => {
    Item.deleteItem(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting a specific Item.'
            });
        } else {
            res.send({Message: `Item with id = ${req.params.id} Deleted Successfully!! `});
        }
    });
};

module.exports = {
    addItem,
    getItemById,
    getItemsList,
    updateItem,
    deleteItem
};