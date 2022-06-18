const { Intent } = require("../models/intent.model");

module.exports = {
    intentExists: async(req, res, next) => {
        let intent = await Intent.findOne();
        if (!intent) {
            const intent = new Intent({
                tag: 'greeting',
                patterns: ['hello','hi','bonjour'],
                responses: ['welcome'],
                context_set: ''
            });
            await intent.save();
        }
        next();
    }
}