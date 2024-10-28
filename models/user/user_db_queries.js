const db = require('../../utils/db-connection');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require('util');

// Promisify the db.query method for async/await use
const query = promisify(db.query).bind(db);
const logger = require('../../utils/logger');

const User = {};

User.addUser = async (newUser, res, result) => {

    if (!newUser.Username || !newUser.Email || !newUser.phoneNumber || !newUser.isVerified || !newUser.address || !newUser.Password || !newUser.Role) {
        logger.warn('Missing user details for registration');
        return res.status(400).json({ message: 'Please provide name, email, phone number, isVerified, address, password, and role' });
    }

    try {
        const existingUsers = await query('SELECT * FROM users WHERE email = ?', [newUser.Email]);
        if (existingUsers.length > 0) {
            logger.warn(`User with email ${newUser.Email} already exists`);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(newUser.Password, 10);

        const newUser1 = {
            name: newUser.Username,
            email: newUser.Email,
            password: hashedPassword,
            address: newUser.address,
            phone_number: newUser.phoneNumber,
            role: newUser.Role,
            is_verified: newUser.isVerified
        };

        const insertResult = await query('INSERT INTO users SET ?', newUser1);

        const payload = { name: newUser.Username, phone_number: newUser.phoneNumber, is_verified: newUser.isVerified, address: newUser.address, role: newUser.Role };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        logger.info(`User registered successfully: ${newUser.Username}`);
        return res.status(201).json({ message: 'User registered successfully', token, user: newUser1 });

    } catch (error) {
        logger.error(`Error during user registration: ${error.message}`, { error });
        return res.status(500).json({ message: 'Internal server error' });
    }
};

User.login = async (User, res, result)=>{
    const { email, password } = User;
    try {
        const existingUsers = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length == 0) {
            logger.warn(`Login attempt for non-existent user: ${email}`);
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, existingUsers[0].password);

        if (!isMatch) {
            logger.warn(`Invalid login attempt for user: ${email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    
        const payload = { name: existingUsers[0].name, email: existingUsers[0].email, address: existingUsers[0].address, phone_number: existingUsers[0].phone_number, role: existingUsers[0].role };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        logger.info(`User logged in successfully: ${existingUsers[0].name}`);
        return res.status(201).json({ message: 'User Login successfully', token, user: existingUsers[0] });

    } catch (error) {
        logger.error(`Error during user login: ${error.message}`, { error });
        return res.status(500).json({ message: 'Internal server error' });
    }
}

User.getUserList = (result) => {

    db.query('SELECT * FROM users', (err, res) => {

        if (err) {
            logger.error(`Error fetching user list: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info('Fetched user list successfully');
        result(null, res);
    });
};

User.getUserListById = (UserID, result) => {

    db.query(`SELECT * FROM users WHERE id = ${UserID}`, (err, res) => {

        if (err) {
            logger.error(`Error fetching user with ID ${UserID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched user with ID ${UserID} successfully`);
        result(null, res);
    });
};

User.getUserListByName = (Username, result) => {
    db.query(`SELECT * FROM users WHERE name = "${Username}"`, (err, res) => {

        if (err) {
            logger.error(`Error fetching user with name ${Username}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched user with name ${Username} successfully`);
        result(null, res);
    });
};

User.getUserListByEmail = (email, result) => {

    db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, res) => {

        if (err) {
            logger.error(`Error fetching user with email ${email}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Fetched user with email ${email} successfully`);
        result(null, res);
    });
};


User.updateUser = (UserID, Data, result) => {

    const userData = db.query(`SELECT * FROM users Where id = ${UserID}`, (err, res) => {

        if (err) {
            logger.error(`Error finding user with ID ${UserID} for update: ${err.message}`, { error: err });
            result(err, null);
            return;
        }

        if (res.length === 0) {
            logger.warn(`User with ID ${UserID} not found for update`);
            result({ kind: "not_found" }, null);
            return;
        }

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
        db.query(updateQuery, (err, result) => {
            if (err) {
                logger.error(`Error updating user with ID ${UserID}: ${err.message}`, { error: err });
                return;
            }
        });

        logger.info(`Updated user with ID ${UserID} successfully`);
        result(null, res);

    });

}


User.deleteUser = (UserID, result) => {
    db.query(`DELETE FROM users WHERE id = "${UserID}"`, (err, res) => {

        if (err) {
            logger.error(`Error deleting user with ID ${UserID}: ${err.message}`, { error: err });
            result(err, null);
            return;
        }
        logger.info(`Deleted user with ID ${UserID} successfully`);
        result(null, res);
    });
}
module.exports = User;  