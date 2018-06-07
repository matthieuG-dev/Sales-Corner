import mongoose from 'mongoose'
import User from './model'

export default {

    readAll (req, res) {
        
        var decodedUser = req.token;

        User.find({}, { _id: 0, creationDate: 0, __v: 0 }, function (err, users) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error	');
            }
            if (!users) {
                res.status(412).send('No users founded!')
            } else {
                res.status(200).send({
                    success: true,
                    content: users
                });
            }
        });
    }
}