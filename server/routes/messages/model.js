import mongoose from 'mongoose'

//MESSAGE SCHEMA
let messageSchema = new mongoose.Schema({
    title: String,
    content: String,
    creationDate: { type: Date, default: Date.now },
    read: false,
    readDate: Date,
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true }
});

export default mongoose.model('Message', messageSchema);