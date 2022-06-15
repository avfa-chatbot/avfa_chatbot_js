const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const accountSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'ADMIN'
    }
}, {
    timestamps: true
});

accountSchema.pre('save', function(next) {
    var account = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(account.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                if (account.password) {
                    account.password = hash;
                }
                next();
            });
        });
    } else {
        return next();
    }
});

accountSchema.methods.getAccount = function() {
    let self = this;
    return ({
        _id: self._id,
        email: self.email,
        username: self.username,
        role: self.role,
        createdAt: self.createdAt,
        updatedAt: self.updatedAt
    })
};

accountSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

accountSchema.statics.findOrCreate = require("find-or-create");

const Account = mongoose.model('account', accountSchema);

module.exports = { Account }