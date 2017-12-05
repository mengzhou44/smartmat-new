const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    clientId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['email', '_id']);
};

UserSchema.methods.generateAuthToken = async function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

    user.tokens.push({ access, token });
    await user.save();
    return token;
};

UserSchema.methods.removeToken = async function (token) {
    var user = this;
    return await user.update({
        $pull: {
            tokens: {
                token
            }
        }
    });
};

UserSchema.statics.findByToken = async function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return await User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredential = async function (email, password) {
    var User = this;
    const user = await User.findOne({ email });

    if (!user) {
        return Promise.reject('invalid email or password');
    }

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, success) => {
            if (success) {
                resolve(user);
            } else {
                reject('invalid email or password');
            }
        });
    });
};

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
