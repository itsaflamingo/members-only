const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name:      { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now() },
    message:   { type: String, required: true },
    title:     { type: String, required: true },
})

module.exports = mongoose.model('Message', messageSchema);