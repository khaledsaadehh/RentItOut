const db = require('../../utils/db-connection');
const logger = require('../../utils/logger'); // Adjust the path if necessary

const RecentView = {};

// Add a new RecentView
RecentView.addRecentView = (newRecentView, result) => {
    db.query('INSERT INTO recent_views SET ?', newRecentView, (err, res) => {
        if (err) {
            logger.error(`Error adding RecentView: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('New RecentView added successfully', { newRecentView });
        result(null, { ...newRecentView });
    });
};

// Get the list of all recent_views
RecentView.getRecentViewsList = (result) => {
    db.query('SELECT * FROM recent_views', (err, res) => {
        if (err) {
            logger.error(`Error fetching RecentViews list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched RecentViews list successfully');
        result(null, res);
    });
};

// Get the RecentView by ID
RecentView.getRecentViewById = (RecentViewID, result) => {
    db.query('SELECT * FROM recent_views WHERE id = ?', [RecentViewID], (err, res) => {
        if (err) {
            logger.error(`Error fetching RecentView with ID ${RecentViewID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched RecentView by ID ${RecentViewID} successfully`);
        result(null, res);
    });
};

// Update a RecentView
RecentView.updateRecentView = (RecentViewID, Data, result) => {
    db.query('SELECT * FROM recent_views WHERE id = ?', [RecentViewID], (err, res) => {
        if (err) {
            logger.error(`Error finding RecentView with ID ${RecentViewID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        if (res.length === 0) {
            logger.warn(`RecentView with ID ${RecentViewID} not found for update`);
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
                logger.error(`Error updating RecentView with ID ${RecentViewID}: ${err.message}`, { error: err });
                result(err, null);
                return;
            }
            logger.info(`Updated RecentView with ID ${RecentViewID} successfully`, { Data });
            result(null, res);
        });
    });
};

// Delete a RecentView
RecentView.deleteRecentView = (RecentViewID, result) => {
    db.query('DELETE FROM recent_views WHERE id = ?', [RecentViewID], (err, res) => {
        if (err) {
            logger.error(`Error deleting RecentView with ID ${RecentViewID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted RecentView with ID ${RecentViewID} successfully`);
        result(null, res);
    });
};

module.exports = RecentView;
