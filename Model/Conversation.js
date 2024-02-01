const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    members: { type: Array,unique:true }
}, { timestamps: true });

// Validate uniqueness within the 'members' array for each document
conversationSchema.path('members').validate(function (value) {
    // Assuming 'value' is the members array
    return Array.isArray(value) && new Set(value).size === value.length;
}, 'Members array must have unique elements');

module.exports = mongoose.model('Conversation', conversationSchema);
