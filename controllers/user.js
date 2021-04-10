const User = require('../models/user');

exports.saveUser = (req, res, next) => {
    const username = req.body.username;
    User.get(username)
    .then(user => {
        if(user){
            return Promise.reject("User Exists");
        }
        const myuser = new User(username);
        return myuser.save();
    })
    .then(result => {
        res.json(result.ops[0]);
    })
    .catch(err => console.log(err));
};

exports.getUsers = (req, res, next) => {
    User.get()
    .then(users => {
        res.json(users);
    })
    .catch(err => console.log(err));
}