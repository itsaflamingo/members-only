const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user:      { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now() },
    message:   { type: String, required: true },
})

messageSchema.virtual('url').get(function() {
    return `/chat/${this._id}`
})

module.exports = mongoose.model('Message', messageSchema);