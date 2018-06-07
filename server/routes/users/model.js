import mongoose from 'mongoose'

//USER SCHEMA
let userShema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: String,
    lastname: String,
    updateDate: Date,
    creationDate: { type: Date, default: Date.now }
});

export default mongoose.model('User', userShema);