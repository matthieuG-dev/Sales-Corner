import express from 'express'

const app = express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('You are connected to the database')
});

app.listen(1407, function (err) {
    if (err) {
        console.log('Connection to the app on port 1407 failed');
    } else {
        console.log('app listening on port 1407');
    }
});