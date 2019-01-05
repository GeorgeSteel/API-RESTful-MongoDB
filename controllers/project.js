'use strict';

const Project = require('../models/project');
const fs = require('fs');

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
        let project = new Project();
        let params = req.body;

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
    },
    getProject: function (req, res) {
        let projectId = req.params.id;

        if (projectId == null) return res.status(404).send({msg:"error: doesnt exists"});

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({msg:"error: cant show the data"});
            if (!project) return res.status(404).send({msg:"error: doesnt exists"});
            return res.status(200).send({project});
        });
    },
    getProjects: function (req, res) {
        Project.find({}).sort('-year').exec((err, projects) =>{
            if (err) return res.status(500).send({msg:"error: cant show the data"});
            if (!projects) return res.status(404).send({msg:"error: doesnt exists projects to show"});
            return res.status(200).send({projects});
        });
    },
    updateProject: function (req, res) {
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true},(err, projectUpdated) => {
            if (err) return res.status(500).send({msg:"error: cant update"});
            if (!projectUpdated) return res.status(404).send({msg:"error: the project that you want update doesnt exists"});
            return res.status(200).send({project: projectUpdated});
        })
    },
    deleteProject: function (req, res) {
        let projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectDeleted) =>{
            if (err) return res.status(500).send({msg:"error: cant delete"});
            if (!projectDeleted) return res.status(404).send({msg:"error: the project that you want delete doesnt exists"});
            return res.status(200).send({project: projectDeleted});
        });
    },
    uploadImg: function (req, res) {
        let projectId = req.params.id;

        if (req.files) {
            let filePath = req.files.img.path;
            let fileSplit = filePath.split('/');
            let fileName = fileSplit[1];
            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'png') {
                Project.findByIdAndUpdate(projectId, {img: fileName}, { new:true }, (err, projectUpdated) =>{
                    if (err) return res.status(500).send({msg:"error: cant upload the img"});
                    if (!projectUpdated) return res.status(404).send({msg:"error: the img that you want upload doesnt exists"});            
                    return res.status(200).send({ project: projectUpdated });
                });  
            }else {
                fs.unlink(filePath, err => {
                    return res.status(200).send({ msg: 'Invalid extention file' });
                });
            }

                      
        } else {
            return res.status(200).send({msg: 'img dont uploaded...'});
        }
    }

}

module.exports = controller;
