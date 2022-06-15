const { Account } = require("../models/account.model")

module.exports = {
    getAllView: async(req, res) => {
        const { msg } = req.query || '';
        let accounts = await Account.find();
        res.render('accounts/accounts', { accounts, title: "Accounts", account_id: req.session._id, username: req.session.username, msg });
    },
    create: async(req, res, next) => {
        const { email, username, password, rpassword, role } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email required" });
        }
        if (!username) {
            return res.status(400).json({ error: "username required" });
        }
        if (await Account.findOne({ username: username })) {
            return res.redirect('/accounts?msg=Username already used');
        }
        if (!password) {
            return res.status(400).json({ error: "password required" });
        }
        if (!rpassword) {
            return res.status(400).json({ error: "reenter password" });
        }
        if (password != rpassword) {
            return res.status(400).json({ error: "password invalid" });
        }
        if (await Account.findOne({ email: email })) {
            return res.redirect('/accounts?msg=Email already used');
        }
        const account = new Account({
            email,
            username,
            password,
            role
        });
        await account.save();
        return res.redirect('/accounts?msg=Account created successfully');
    },
    delete: async(req, res) => {
        const { _id } = req.params;
        const accountExist = await Account.findOne({ _id: _id });
        const oneAdmin = await Account.find({ role: 'ADMIN' });
        if (oneAdmin.length == 1) {
            return res.redirect('/accounts?msg=There is only one admin');
        }
        if (accountExist) {
            await Account.deleteOne({ _id: _id });
        }
        res.redirect('/accounts?msg=Account deleted successfully');
    },
    showUpdate: async(req, res) => {
        const { msg } = req.query || '';
        const { _id } = req.params;
        let account = await Account.findOne({ _id: _id });
        res.render('accounts/update', { account, title: "Update Account", account_id: req.session._id, username: req.session.username, msg });
    },
    update: async(req, res) => {
        const { _id, email, username, role } = req.body;
        const account = await Account.findOne({ _id: _id });
        if (!account) {
            return res.status(400).json({ error: "account not found", _id: _id });
        }
        await Account.updateOne({ _id: _id }, { email: email, username: username, role: role });
        res.redirect('/accounts/update/' + _id + '?msg=Account updated successfully');
    },
    updatePassword: async(req, res) => {
        const { _id, password, rpassword } = req.body;
        const account = await Account.findOne({ _id: _id });
        if (!account) {
            return res.status(400).json({ error: "account not found", _id: _id });
        }
        if (password != rpassword) {
            return res.status(400).json({ error: "reenter new password" });
        }
        account.password = password;
        await account.save();
        res.redirect('/accounts/update/' + _id + '?msg=Password updated successfully');
    },
    showLogin: async(req, res) => {
        const { msg } = req.query || '';
        res.render('accounts/login', { title: "Proximus Login", msg });
    },
    login: async(req, res) => {
        const { username, password } = req.body;
        if (!username) {
            return res.status(400).json({ error: "Email required" });
        }
        if (!password) {
            return res.status(400).json({ error: "Password required" });
        }
        const account = await Account.findOne({ username: username });
        if (!account) {
            return res.redirect('/login?msg=User does not exist');
        } else {
            account.comparePassword(password, function(err, isMatch) {
                if (err) { throw err; }
                if (isMatch) {
                    req.session._id = account._id;
                    req.session.email = account.email;
                    req.session.username = account.username;
                    req.session.role = account.role;
                    res.redirect('/');
                } else {
                    return res.redirect('/login?msg=Password is not correct');
                }
            });
        }
    },
    logout: async(req, res) => {
        const { msg } = req.query || '';
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/login?msg=' + msg);
        });
    }
}