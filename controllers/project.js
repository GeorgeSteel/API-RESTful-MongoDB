'use strict';

const Project = require('../models/project');

const controller = {
    home: function (req, res) {
        return res.status(200).send({
            msg: 'Home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            msg: 'test method'
        });
    },
    saveProject: function (req, res) {
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.img = null;

        project.save((err, projectStored) =>{
            if (err) return res.status(500).send({msg:"error: cant save the document"});
            if (!projectStored) return res.status(404).send({msg:"error: cant save the project"});
            return res.status(200).send({project: projectStored});
        });
    }
}

module.exports = controller;
