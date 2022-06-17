const { response } = require('express');
const { Intent } = require('../models/intent.model');

var self = module.exports = {
    getAllView: async(req, res) => {
        const { msg } = req.query || '';
        let intents = await Intent.find();
        res.render('intents/intents', { intents, title: "Intents", account_id: req.session._id, username: req.session.username, msg });
    },
    getAll: async(req, res) => {
        let intents = await Intent.find();
        res.json({intents : intents});
    },
    create: async(req, res) => {
        let { tag, patterns, responses } = req.body;
        const context_set = "";
        //console.log("console : " +tag +" , "+ patterns+" , "+ responses);
        const intentExist = await Intent.findOne({ tag: tag });
        if (intentExist) {
            return res.redirect('/intents?msg=Tag already used');
        }

        while(patterns.charAt(patterns.length - 1) == ";" || patterns.charAt(patterns.length - 1) == " "){
            patterns = patterns.substring(0, patterns.length -1);
        }
        
        while(responses.charAt(responses.length - 1) == ";" || responses.charAt(responses.length - 1) == " "){
            responses = responses.substring(0, responses.length -1);
        }

        let arrayPatterns = [];
        let arrayResponses = [];

        let i = 0;
        patterns.split(";").forEach(element => {
            if(element != "" && element.replace(/\s/g, '') != ""){
                arrayPatterns[i] = element;
                i++;
            }
        });

        let j = 0;
        responses.split(";").forEach(element => {
            if(element != "" && element.replace(/\s/g, '') != ""){
                arrayResponses[j] = element;
                j++;
            }
        });
        
        if(patterns != "" && responses != ""){
            const intent = new Intent({
                tag,
                patterns : arrayPatterns,
                responses : arrayResponses,
                context_set
            });
            await intent.save();
            res.redirect('/intents?msg=Intent created successfully');
        }else{
            res.redirect('/intents?msg=Creation fault : Patterns or responses are empty');
        }
    },
    getOneById: async(req, res) => {
        const { _id } = req.query;
        const intent = await Intent.findOne({ _id: _id });
        res.json(intent);
    },
    delete: async(req, res) => {
        const { _id } = req.params;
        const intentExist = await Intent.findOne({ _id: _id });
        if (!intentExist) {
            return res.status(400).json({ error: "Intent Not Found" + _id });
        }
        await Intent.deleteOne({ _id: _id });
        res.redirect('/intents?msg=Intent deleted successfully');
    },
    showUpdate: async(req, res) => {
        const { msg } = req.query || '';
        const { _id } = req.params;
        let intent = await Intent.findOne({ _id: _id });
        let patterns = "";
        let responses = "";
        
        intent.patterns.forEach(pattern => {
            patterns += pattern + ";";
        });
        intent.responses.forEach(response => {
            responses += response + ";";
        });
        
        res.render('intents/update', { intent, patterns, responses, title: "Update Intent", account_id: req.session._id, username: req.session.username, msg });
    },
    update: async(req, res) => {
        let { _id, tag, patterns, responses, context_set } = req.body;
        const intentExist = await Intent.findOne({ tag: tag });
        
        if (intentExist) {
            if (intentExist._id != _id) {
                return res.redirect('/intents?msg=Tag already used');
            }
        }

        while(patterns.charAt(patterns.length - 1) == ";" || patterns.charAt(patterns.length - 1) == " "){
            patterns = patterns.substring(0, patterns.length -1);
        }
        
        while(responses.charAt(responses.length - 1) == ";" || responses.charAt(responses.length - 1) == " "){
            responses = responses.substring(0, responses.length -1);
        }
        
        let arrayPatterns = [];
        let arrayResponses = [];

        let i = 0;
        patterns.split(";").forEach(element => {
            if(element != "" && element.replace(/\s/g, '') != ""){
                arrayPatterns[i] = element;
                i++;
            }
        });

        let j = 0;
        responses.split(";").forEach(element => {
            if(element != "" && element.replace(/\s/g, '') != ""){
                arrayResponses[j] = element;
                j++;
            }
        });
        
        if(patterns != "" && responses != ""){
            await Intent.updateOne({ _id: _id }, { tag: tag, patterns: arrayPatterns, responses: arrayResponses, context_set: context_set });
            res.redirect('/intents?msg=Intent updated successfully');
        }else{
            res.redirect('/intents?msg=Update fault : Patterns or responses are empty');
        }
        
    }
}