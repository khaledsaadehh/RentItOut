const db = require('../../utils/db-connection');

const RecentView = {};

// Add a new RecentView
RecentView.addRecentView = (newRecentView, result) => {
    db.query('INSERT INTO recent_views SET ?', newRecentView, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newRecentView });
    });
};


// Get the list of all recent_views
RecentView.getRecentViewsList = (result) => {
    db.query('SELECT * FROM recent_views', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of recent_views by RecentViewID
RecentView.getRecentViewById = (RecentViewID, result) => {
    db.query('SELECT * FROM recent_views WHERE id = ?', [RecentViewID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an recent_view
RecentView.updateRecentView = (RecentViewID, Data, result) => {
        db.query('SELECT * FROM recent_views WHERE id = ?', [RecentViewID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE recent_views SET ';
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
        updateData.push(RecentViewID);
        
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

// Delete an recent_views
RecentView.deleteRecentView = (RecentViewID, result) => {
    db.query('DELETE FROM recent_views WHERE id = ?', [RecentViewID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = RecentView;