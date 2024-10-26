const db = require('../../utils/db-connection');

const Item = {};

// Add a new Item
Item.addItem = (newItem, result) => {
    db.query('INSERT INTO items SET ?', newItem, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newItem });
    });
};


// Get the list of all items
Item.getItemsList = (result) => {
    db.query('SELECT * FROM items', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of items by ItemID
Item.getItemById = (ItemID, result) => {
    db.query('SELECT * FROM items WHERE id = ?', [ItemID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an item
Item.updateItem = (ItemID, Data, result) => {
        db.query('SELECT * FROM items WHERE id = ?', [ItemID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
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
                console.error('Error updating record:', err);
                result(err, null);
                return;
            }
            console.log('Record updated successfully');
            result(null, res);
        });
    });
};

// Delete an items
Item.deleteItem = (ItemID, result) => {
    db.query('DELETE FROM items WHERE id = ?', [ItemID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Item;