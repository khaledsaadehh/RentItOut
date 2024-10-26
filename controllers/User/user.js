const User = require('../../models/user/user_db_queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createNewUser = (req, res) => {
  const newUser = req.body;
  User.addUser(newUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred register user.'
      });
    } else {
      res.send(data);
    }
  });
};


const getUserList = (req, res) => {
  User.getUserList((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while get list of users.'
      });
    } else {
      res.send(data);
    }
  });
};

const getUserListById = (req, res) => {
  User.getUserListById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while get user by id '
      });
    } else {
      res.send(data);
    }
  });
};

const getUserListByName = (req, res) => {
  User.getUserListByName(req.params.name, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while get list of users by name.'
      });
    } else {
      res.send(data);
    }
  });
};

const getUserListByEmail = (req, res) => {
  User.getUserListByEmail(req.params.email, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while get user by email.'
      });
    } else {
      res.send(data);
    }
  });
};
const updateUser = (req, res) => {
  User.updateUser(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while update user data.'
      });
    } else {
      res.send({Message: `User with id = ${req.params.id} Updated Successfully!! `});

    }
  });
};


const deleteUser = (req, res) => {
  User.deleteUser(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while delete user.'
      });
    } else {
      res.send({Message: `User with id = ${req.params.id} Deleted Successfully!! `});
    }
  });

};

const getPublicData = (req, res) => {
  res.json({ message: 'This is public data' });
};

const getUserData = (req, res) => {
  res.json({ message: `Hello ${req.user.name}, this is user data` });
};

const getAdminData = (req, res) => {
  res.json({ message: `Hello ${req.user.Username}, this is admin data` });
};


const register = async (req, res) => {
  const { UserID ,Username, Email, address, phoneNumber, Password, Role } = req.body;

  User.addUser(req.body, res, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while register new user.'
      });
    } else {
      res.send(data);
    }
  });

  
};

const login = async (req, res) => {
  const { Email, Password } = req.body;

  console.log(req.body);
  User.login(req.body, res, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while sign in.'
      });
    } else {
      res.send(data);
    }
  });


};

module.exports = {
  createNewUser,
  getUserList,
  getUserListById,
  getUserListByName,
  getUserListByEmail,
  updateUser,
  deleteUser,
  getPublicData,
  getUserData,
  getAdminData,
  register,
  login
};