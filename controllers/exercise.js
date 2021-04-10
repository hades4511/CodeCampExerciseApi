const { validationResult } = require('express-validator');
const Exercise = require('../models/exercise');
const User = require('../models/user');

exports.addExercise = (req, res, next) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.json({error: "Invalid Parameters"});
    }

    const userid = req.body.userId;
    const descr = req.body.description;
    const duration = parseInt(req.body.duration);
    const date = req.body.date;
    const exercise = new Exercise(userid, descr, duration, date);
    User.getById(userid)
    .then(user => {
        exercise.save();
        const { userid, ...upexercise } = exercise;
        const merged = {...user, ...upexercise};
        res.json(merged);
    })
    .catch(err => console.log(err));
};

exports.getExecises = (req, res, next) => {
    const userid = req.query.userId;
    console.log(userid);
    Exercise.getAllByUser(userid)
    .then(result => {
        let to = req.query.to;
        let from = req.query.from;
        let limit = req.query.limit;
        if(from){
            from = new Date(from);
            result.log = result.log.filter(function( obj ) {
                        return new Date(obj.date) >= from;
                    });
        }
        if(to){
            to = new Date(from);
            result.log = result.log.filter(function( obj ) {
                        return new Date(obj.date) <= from;
                    });
        }
        if(limit){
            console.log(result);
            limit = parseInt(limit);
            result.log = result.log.slice(0, limit + 1);
        }
        res.json(result);
    })
    .catch(err => console.log(err));
};