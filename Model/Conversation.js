const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    members: { type: Array, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
