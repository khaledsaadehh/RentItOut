const db = require('../../utils/db-connection');
const logger = require("../../utils/logger");


const Item = {};

// Add a new Item
Item.addItem = (newItem, result) => {
    db.query('INSERT INTO items SET ?', newItem, (err, res) => {
        if (err) {
            logger.error(`Error adding Item: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New Item added successfully', { newItem });
        result(null, { ...newItem });
    });
};


// Get the list of all items
Item.getItemsList = (result) => {
    db.query('SELECT * FROM items', (err, res) => {
        if (err) {
            logger.error(`Error fetching Items list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched Items list successfully');
        result(null, res);
    });
};


// Get the list of items by ItemID
Item.getItemById = (ItemID, result) => {
    db.query('SELECT * FROM items WHERE id = ?', [ItemID], (err, res) => {
        if (err) {
            logger.error(`Error fetching Item with ID ${ItemID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched Item by ID ${ItemID} successfully`);
        result(null, res);
    });
};


// Update an item
Item.updateItem = (ItemID, Data, result) => {
        db.query('SELECT * FROM items WHERE id = ?', [ItemID], (err, res) => {
        if (err) {
            logger.error(`Error finding Item with ID ${ItemID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`Item with ID ${ItemID} not found for update`);
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE items SET ';
        let updateData = [];
        Object.keys(Data).forEach((key, index) => {
            if (Data[key] !== '') {
                updateQuery += `${key} = ?`;
                updateData.push(Data[key]);
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ' WHERE id = ?';
        updateData.push(ItemID);
        
        db.query(updateQuery, updateData, (err, res) => {
            if (err) {
                logger.error(`Error updating Item with ID ${ItemID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated Item with ID ${ItemID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete an items
Item.deleteItem = (ItemID, result) => {
    db.query('DELETE FROM items WHERE id = ?', [ItemID], (err, res) => {
        if (err) {
            logger.error(`Error deleting Item with ID ${ItemID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted Item with ID ${ItemID} successfully`);
        result(null, res);
    });
};

module.exports = Item;