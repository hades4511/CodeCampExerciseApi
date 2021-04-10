const getdb = require('../util/database').getdb;
const mongodb = require('mongodb');

module.exports = class Exercise{
    constructor(userid, description, duration, date){
        this.userid = userid;
        this.description = description;
        this.duration = duration;
        this.date = date ? date : new Date().toISOString().split('T')[0];
    }

    save(){
        const db = getdb();
        return db.collection('exercises').insertOne(this);
    }

    static getAllByUser(userid){
        const db = getdb();
        return db.collection('users')
        .aggregate([
            {
                $match: {
                    _id: new mongodb.ObjectId(userid)
                }
            },
            {
                $project: {
                    _id: { $toString: "$_id" },
                    username: "$username"
                }
            },
            {
                $lookup: {
                    from: 'exercises',
                    localField: '_id',
                    foreignField: 'userid',
                    as: 'log'
                }
            },
            {
                $project: {
                    "username": 1,
                    "count": { $size:"$log" },
                    "log.description": 1,
                    "log.duration": 1,
                    "log.date": 1
                }
            }
        ]).next();
    }
};