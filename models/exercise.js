const getdb = require('../util/database').getdb;
const mongodb = require('mongodb');

module.exports = class Exercise{
    constructor(userid, description, duration, date){
        this.userid = userid;
        this.description = description;
        this.duration = duration;
        if(date){
            this.date = new Date(date).toDateString();
        }
        else{
            this.date = new Date().toDateString();
        }
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
                    "log.userid": 0,
                    "log._id": 0
                }
            }
        ]).next();
    }
};