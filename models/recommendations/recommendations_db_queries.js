const db = require('../../utils/db-connection');

const Recommendation = {};

// Add a new Recommendation
Recommendation.addRecommendation = (newRecommendation, result) => {
    db.query('INSERT INTO recommendations SET ?', newRecommendation, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { ...newRecommendation });
    });
};


// Get the list of all recommendations
Recommendation.getRecommendationsList = (result) => {
    db.query('SELECT * FROM recommendations', (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Get the list of recommendations by RecommendationID
Recommendation.getRecommendationById = (RecommendationID, result) => {
    db.query('SELECT * FROM recommendations WHERE id = ?', [RecommendationID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


// Update an recommendation
Recommendation.updateRecommendation = (RecommendationID, Data, result) => {
        db.query('SELECT * FROM recommendations WHERE id = ?', [RecommendationID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        
        let updateQuery = 'UPDATE recommendations SET ';
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
        updateData.push(RecommendationID);
        
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

// Delete an recommendations
Recommendation.deleteRecommendation = (RecommendationID, result) => {
    db.query('DELETE FROM recommendations WHERE id = ?', [RecommendationID], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Recommendation;