const jwt = require('jsonwebtoken');
const models = require('../models/index');
const bcrypt = require("bcryptjs");

var authService = {
    signUser: function (user) {
        console.log('userrrrrrrrrrrr', user)
        const token = jwt.sign(
            {
                email: user.email,
                id: user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );
        console.log('userrr+++++', user)
        return token;
    },
    verifyAdmin: async function (token) {
        if (!token) {
            return false
        }
        try{ let decoded = jwt.verify(token, JWT_SECRET);
        const admin = await models.Admins.findByPk(decoded.id)
        if (admin) {
            return admin
        }
        else {
            return false
        } 
    }catch(error){
        
        return false
    }
    },
    verifyVolunteer: async function (token) {
        if (!token) {
            return false
        }
        try{ let decoded = jwt.verify(token, JWT_SECRET);
        const volunteer = await models.Volunteers.findByPk(decoded.id)
        if (volunteer) {
            return volunteer
        }
        else {
            return false
        } 
    }catch(error){
        return false
    }
    },
    hashPassword: function (plainTextPassword) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePasswords: function (plainTextPassword, hashedPassword) {
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
    }
}
module.exports = authService;