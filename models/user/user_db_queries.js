const db = require('../../utils/db-connection');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require('util');

// Promisify the db.query method for async/await use
const query = promisify(db.query).bind(db);

const User = {};

User.addUser = async (newUser, res, result) => {
    console.log("&&&");
    // global.userId = newUser.UserID;

    if (!newUser.Username || !newUser.Email || !newUser.phoneNumber || !newUser.address || !newUser.Password || !newUser.Role) {
        return res.status(400).json({ message: 'Please provide name, email, phone number, address, password, and role' });
    }

    try {
        const existingUsers = await query('SELECT * FROM users WHERE email = ?', [newUser.Email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newUser.Password, 10);
        console.log(hashedPassword);
        console.log("!!");

        // Create new user object
        const newUser1 = {
            name: newUser.Username,
            email: newUser.Email,
            password: hashedPassword,
            address: newUser.address,
            phone_number: newUser.phoneNumber,
            role: newUser.Role
        };

        // Insert the new user into the database
        const insertResult = await query('INSERT INTO users SET ?', newUser1);

        // Generate JWT token
        const payload = { name: newUser.Username, phone_number: newUser.phoneNumber, address: newUser.address, role: newUser.Role };
        console.log(payload);
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send success response
        return res.status(201).json({ message: 'User registered successfully', token, user: newUser1 });

        // The following line is unnecessary with async/await
        // result(null, { ...newUser1, id: insertResult.insertId });
    } catch (error) {
        console.error('Error:', error);

        // Send error response if something goes wrong
        return res.status(500).json({ message: 'Internal server error' });
    }
};

User.login = async (User, res, result)=>{
    const { email, password } = User;
    try {
        const existingUsers = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length == 0) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, existingUsers[0].password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    
        const payload = { name: existingUsers[0].name, email: existingUsers[0].email, address: existingUsers[0].address, phone_number: existingUsers[0].phone_number, role: existingUsers[0].role };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User Login successfully', token, user: existingUsers[0] });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

User.getUserList = (result) => {

    db.query('SELECT * FROM users', (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.getUserListById = (UserID, result) => {

    db.query(`SELECT * FROM users WHERE id = ${UserID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.getUserListByName = (Username, result) => {
    db.query(`SELECT * FROM users WHERE name = "${Username}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.getUserListByEmail = (email, result) => {

    db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


User.updateUser = (UserID, Data, result) => {

    const userData = db.query(`SELECT * FROM users Where id = ${UserID}`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        console.log(res);
        let updateQuery = 'UPDATE users SET ';
        Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
            if (Data[key] !== '') {
                updateQuery += `${key} = '${Data[key]}'`;
                if (index < Object.keys(Data).length - 1) {
                    updateQuery += ', ';
                }
            }
        });
        updateQuery += ` WHERE id = ${UserID}`;
        console.log(updateQuery);
        // Execute the update query
        db.query(updateQuery, (err, result) => {
            if (err) {
                console.error('Error updating record:', err);
                return;
            }
            console.log('Record updated successfully');
        });

        result(null, res);

    });

}


User.deleteUser = (UserID, result) => {
    db.query(`DELETE FROM users WHERE id = "${UserID}"`, (err, res) => {

        if (err) {
            console.log(3);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
module.exports = User;  