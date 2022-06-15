const { Account } = require("../models/account.model");

module.exports = {
    isAdmin: function(req, res, next) {
        if (req.session.role === 'ADMIN') {
            next();
        } else {
            res.redirect('/');
        }
    },
    isUser: function(req, res, next) {
        if (req.session.role === 'USER') {
            next();
        } else {
            res.redirect('/');
        }
    },
    isLogged: async function(req, res) {
        if (req.session.role == "ADMIN") {
            res.render('adminHome', { title: 'chatbot avfa Admin Dashboard', account_id: req.session._id, username: req.session.username });
        } else if (req.session.role == "USER") {
            res.render('userHome', { title: 'chatboat avfa Dashboard', account_id: req.session._id, username: req.session.username });
        } else {
            res.redirect('/login');
        }
    },
    showLogin: (req, res, next) => {
        if (req.session.username) {
            res.redirect('/');
        } else {
            next();
        }
    },
    adminExists: async(req, res, next) => {
        let account = await Account.findOne({ role: 'ADMIN' });
        if (!account) {
            const accountExist = await Account.findOne({ username: 'admin' });
            if (accountExist) {
                await Account.deleteOne({ _id: accountExist._id });
            }
            const account = new Account({
                email: 'undefined',
                username: 'admin',
                password: 'admin',
                role: 'ADMIN'
            });
            await account.save();
        }
        next();
    }
}