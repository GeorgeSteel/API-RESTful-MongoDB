'use strict';

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
    }
}

module.exports = controller;
