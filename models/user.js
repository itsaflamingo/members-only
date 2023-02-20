const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:        { type: String, required: true },
    last_name:         { type: String, required: true },
    username:          { type: String, required: true },
    password:          { type: String, required: true },
    membership_status: { type: String, enum: ['Member', 'Not member'] }
})

userSchema.virtual('url').get(function() {
    return `/user/${this._id}`
})

module.exports = mongoose.model('User', userSchema);