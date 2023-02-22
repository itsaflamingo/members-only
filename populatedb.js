const userArgs = process.argv.slice(2);
const async = require('async')

const User = require('./models/user');
const Message = require('./models/message');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); //prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const messages = [];
const users = [];

function userCreate(first_name, last_name, username, password, confirm_password, membership_status, callback) {

    userdetail = { first_name, last_name, username, password, confirm_password, membership_status };

    const user = new User(userdetail);

    user.save(function(err) {
        if(err) {
            callback(err, null)
            return;
        }
        console.log('New User: ' + user);
        users.push(user);
        callback(null, user)
    })
}

function messageCreate(user, timestamp, message, title, callback) {

    messagedetail = { 
        user,
        timestamp,
        message,
        title
    }

    const newMessage = new Message(messagedetail);

    newMessage.save(err => {
        if(err) {
            callback(err, null);
            return;
        }
        console.log('New Message: ' + newMessage);
        messages.push(newMessage);
        callback(null, newMessage);
    })
}

function createUser(callback) {
    async.parallel([
        function(callback) {
            userCreate('Name', 'LastName', 'test_user', 'password', 'password', 'Member', callback)
        },
        function(callback) {
            userCreate('Namey', 'LastNamey', 'test_user2', 'password', 'password', 'Member', callback)
        }
    ], callback)
}

function createMessage(callback) {
    async.parallel([
        function(callback) {
            messageCreate(users[0], '2023/Feb/21', 'test message', 'test', callback);
        },
        function(callback) {
            messageCreate(users[1], '2023/Feb/21', 'test2', 'test', callback);
        }
    ], callback)
}

async.series([
    createUser,
    createMessage
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('done!');
    }
    // All done, disconnect from database
    mongoose.connection.close();
})
