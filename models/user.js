const getdb = require('../util/database').getdb;
const mongodb = require('mongodb');

module.exports = class User{
    constructor(username, id){
        this.username = username;
        this._id = id;
    }

    static get(username){
        const db = getdb();
        if(username)
            return db.collection('users').find({ username: username}).next();
        return db.collection('users').find().toArray();
    }

    static getById(id){
        const db = getdb();
        return db.collection('users').find({ _id: new mongodb.ObjectId(id) }).next();
    }

    save(){
        const db = getdb();
        return db.collection('users').insertOne(this);
    }
};