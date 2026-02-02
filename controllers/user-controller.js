const jwt = require('jsonwebtoken');
const { response } = require('../utils');
const User = require('../models/user');
const { where } = require('sequelize');
const { raw } = require('body-parser');

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';
const JWT_EXPIRES_IN = '1h';

// Login using email and password
async function loginCheck(req, res) {
    try {
        const body = req.body;

        const result = await User.findAll({
            where: {
                email: body.email, password: body.password
            },
            raw: true
        });
        // console.log(result);
        if (result.length > 0) {

            const jwt_payload = {
                email: body.email
            }

            const token = jwt.sign(jwt_payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            // console.log(token)
            let data = {
                userInfo: result[0],
                token: token
            }
            return response(res, {
                statusCode: 200,
                message: "Login Succesful",
                data: data
            })
        } else {
            return response(res, {
                statusCode: 404,
                message: "Invalid Credentials"
            })
        }

    }
    catch (err) {
        console.error(err);
    }
}

//  Get All Users Information
async function getUsers(req, res) {
    try {
        const result = await User.findAll({ order: [['id', 'DESC']],
            raw: true 
        });
        // console.log(result);
        if (result.length > 0) {
            return response(res, {
                statusCode: 200,
                message: "Users Information",
                data: result
            })
        } else {
            return response(res, {
                statusCode: 404,
                message: "No Data Found"
            })
        }
    }
    catch (err) {
        console.error(err);
    }
}
// Get User Information by ID
async function getUserById(req, res) {
    try {
        const result = await User.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        });
        // console.log(result);
        if (result) {
            return response(res, {
                statusCode: 200,
                message: "Users Information",
                data: result
            })
        } else {
            return response(res, {
                statusCode: 404,
                message: "No Data Found"
            })
        }
    }
    catch (err) {
        console.error(err);
    }
}

// Save New User
async function saveUsers(req, res) {
    try {
        const body = req.body;

        const found = await User.findAll({ where: { email: body.email }, raw: true });

        // console.log(found, found.length);
        if (found.length === 0) {
            const result = await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
                city: body.city,
                phoneNumber: body.phoneNumber
            });
            // console.log(result.get({ plain: true }));
            return response(res, {
                statusCode: 200,
                message: "User Saved Succesfully",
                data: result.get({ plain: true })
            })

        } else {
            return response(res, {
                statusCode: 500,
                message: "User already registered",
                data: found
            })
        }



    }
    catch (err) {
        console.error(err);
    }
}

// Update Existing User
async function updateUsers(req, res) {
    try {
        const body = req.body;

        const [count, rows] = await User.update({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            city: body.city,
            phoneNumber: body.phoneNumber
        },
            {
                where: { id: body.id },
                returning: true
            });
        if (count === 0) {
            return response(res, {
                statusCode: 404,
                message: "User Not Found",
                data: null
            })
        }
        if (count > 0) {
            return response(res, {
                statusCode: 200,
                message: "User Updated Succesfully",
                data: rows
            })
        }


    }
    catch (err) {
        console.error(err);
    }
}

// Update User Active/Inactive Status
async function updateUserStatus(req, res) {
    try {
        const body = req.body;

        const [count, rows] = await User.update({
            isActive: body.isActive
        },
            {
                where: { id: body.id },
                returning: true
            });
        if (count === 0) {
            return response(res, {
                statusCode: 404,
                message: "User Not Found",
                data: null
            })
        }
        if (count > 0) {
            let message = body.isActive === true ? "User Activated Succesfully" : "User Deactivated Succesfully";
            return response(res, {
                statusCode: 200,
                message: message,
                data: rows
            })
        }


    }
    catch (err) {
        console.error(err);
    }
}



module.exports = {
    loginCheck,
    getUsers,
    getUserById,
    saveUsers,
    updateUsers,
    updateUserStatus
}