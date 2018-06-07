import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
const app = express();

var secretkey = 'motdepassesecret';

mongoose.connect('mongodb://localhost/users');
var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('You are connected to the database')
});

//CORS cross-origin
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, token');
    //intercept OPTIONS method;
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
})


// let router = express.Router()

//ROUTES IMPORT
    // import users from './routes/users'

// USER SCHEMA
var userShema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: String,
    lastname: String,
    updateDate: Date,
    creationDate: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userShema);

// MESSAGE SCHEMA
var messageSchema = new Schema({
    title: String,
    content: String,
    creationDate: { type: Date, default: Date.now },
    read: false,
    readDate: Date,
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true }
});

var Message = mongoose.model('Message', messageSchema);

//PRODUCT SCHEMA
var productSchema = new Schema({
    creationDate: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    userId: String,
    loc: {
        type: String,
        coordinates: [Number]      // create the geospatial index
    }
});

productSchema.index({ loc: '2dsphere' });

var Product = mongoose.model('Product', productSchema);

// SIGNUP ROUTE
app.post('/auth/signup', function (req, res) {

    if (!req.body.username || !req.body.password) {
        res.status(412).send('You should to provide a mail and a password');

    } else {

        var newUser = new User;
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;

        function validateEmail() {
            var regex = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(newUser.username).toLowerCase());
        }

        if (!validateEmail()) {
            res.status(412).send('invalid mail')
        } else {
            User.findOne({
                username: newUser.username
            }, function (err, result) {

                if (result) {
                    res.status(412).send('This mail is already used')
                } else {
                    //enregistrement dans la base de donnée
                    newUser.save(function (err, newUser) {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Error on database');
                        } else {
                            res.status(200).send({
                                success: true,
                                content: newUser
                            })
                        }
                    })
                }
            });
        }
    }
});

// LOGIN ROUTE
app.post('/auth/login', function (req, res) {

    if (!req.body.username) {
        res.status(400).send('mail required');
        return;
    }

    if (!req.body.password) {
        res.status(400).send('password required');
        return;
    }

    User.findOne({ username: req.body.username, password: req.body.password }, function (err, result) {
        if (err) {
            return console.log(err);
        }

        if (!result) {
            res.status(500).send('Mail or password invalid');
        } else {

            var myToken = jwt.sign({ username: req.body.username, password: req.body.password }, secretkey);

            res.status(200).send({
                success: true,
                token: myToken
            });
        }
    });
});

//MIDDLEWARE FOR VERIFY TOKEN
app.use(function (req, res, next) {

    var token = req.headers.token;

    var goodToken = jwt.verify(token, secretkey);

    if (!goodToken) {
        res.status(401).send({
            sucess: false,
            message: 'You should be authenticated to access this route   !'
        });
    } else {

        req.token = jwt.decode(token, secretkey);

        next();
    }
});

// USERS GET AND PUT ROUTES
// router.use('users', users)

app.get('/users', function (req, res) {

    var decodedUser = req.token;

    User.find({}, { _id: 0, creationDate: 0, __v: 0 }, function (err, users) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error	');
        } else if (!users) {
            res.status(412).send('No users founded!')
        } else {
            res.status(200).send({
                success: true,
                content: users
            });
        }
    });
});

app.put('/users', (req, res) => {

    var currentUser = req.token.username;
    var userId = req.params.userId
    var newPassword = req.body.password;

    if (!req.body.password) {
        res.status(412).send('You need to provide a new passwoord')
    } else {
        User.findOneAndUpdate({ username: currentUser }, { $set: { password: newPassword } }).exec((err, newProfil) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (!newProfil) {
                res.status(412).send('Preconditions Failed !')
            } else {
                res.status(200).send({
                    success: true
                });
            }
        })
    }
});

// MESSAGES ROUTES (POST, GET, PUT AND DELETE)
app.post('/messages', function (req, res) {

    var decodedUser = req.token;

    var newMessage = new Message;
    newMessage.title = req.body.title;
    newMessage.content = req.body.content;
    newMessage.senderId = decodedUser.username;
    newMessage.receiverId = req.body.receiver;

    if (!req.body.title) {
        res.status(412).send('Votre message doit contenir un titre')
    } else if (!req.body.content) {
        res.status(412).send('Votre message est vide')
    } else {
        User.findOne({ 'username': req.body.receiver }, function (err, result) {
            if (err) {
                console.log(err);
            } else if (!result) {
                res.status(412).send("Ce destinataire n'éxiste pas");
            } else {
                newMessage.save(function (err, newMessage) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error on database');
                    } else if (!newMessage) {
                        res.status(500).send("User not find on database");
                    } else {
                        res.status(200).send({
                            success: true,
                            content: newMessage
                        })
                    }
                });
            }
        });
    }
});

app.get('/messages', function (req, res) {

    var decodedUser = req.token;
    var currentUser = decodedUser.username;

    Message.find({ receiverId: currentUser }, function (err, result) {
        if (err) {
            return console.log(err);
        } else if (!result) {
            res.status(412).send('you have no messages')
        } else {
            res.status(200).send({
                success: true,
                content: result
            })
        }
    })

});

app.put('/messages/:id', function (req, res) {

    var decodedUser = req.token;
    var currentUser = decodedUser.username;
    var messageId = req.params.id

    if (!req.params.id) {
        res.status(412).send('You need to provide a message id to access this route')
    } else {
        Message.update({ _id: messageId }, { $set: { read: true, readDate: req.body.date } }, function (err, result) {
            if (err) {
                return console.log(err);
            } else if (!result) {
                res.status(500).send('Error on database')
            } else {
                res.status(200).send({
                    success: true,
                    content: result
                });
            }
        });
    }
});

app.delete('/messages/:id', (req, res) => {

    var currentUser = req.token.username;
    var messageId = req.params.id;

    Message.remove({ _id: messageId, receiverId: currentUser }, (err, message) => {
        if (err) {
            console.log(err);
        } else if (message.n === 0) {
            console.log(message)
            res.status(412).send('preconditions failed')
        } else {
            res.status(200).send({
                success: true
            })
        }
    })
})

// PRODUCTS ROUTES (POST, GET, PUT AND DELETE)

app.post('/products', (req, res) => {

    var decodedUser = req.token;

    var newProduct = new Product;
    newProduct.title = req.body.title,
    newProduct.category = req.body.category
    newProduct.description = req.body.description,
    newProduct.price = req.body.price,
    newProduct.userId = decodedUser.username

    if (!req.body.title) {
        res.status(412).send('You need to provide a title please')
    } else if (!req.body.category) {
            res.status(412).send('You need to choose a category')
        } else if (!req.body.description) {
                res.status(412).send('You need to provide a description please')
            } else if (!req.body.price) {
                    res.status(412).send('You need to provide a price please')
                } else {
                    newProduct.save((err, newProduct) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Error on database');
                        } else {
                            res.status(200).send({
                                success: true,
                                content: newProduct
                            })
                        }
                    })
                }
            })

app.get('/products', (req, res) => {

    var decodedUser = req.token;

    Product.find({}, { __v: 0 }, (err, products) => {
        if (err) {
            console.log(err);
            return res.status(500); send('Error on database')
        } else if (!products) {
            res.status(412).send('No products found')
        } else {
            res.status(200).send({
                success: true,
                content: products
            })
        }
    })
})

app.get('/products/:user', (req, res) => {

    var decodedUser = req.token;
    var currentUser = decodedUser.username;

    Product.find({ userId: currentUser }, (err, products) => {
        if (err) {
            console.log(err)
        } else if (!products) {
            res.status(412).send("Vous n'avez pas de produits")
        } else {
            res.status(200).send({
                success: true,
                content: products
            })
        }
    })
})

app.put('/products/:id', (req, res) => {

    var currentUser = req.token.username;
    var productId = req.params.id;
    var newTitle = req.body.title;
    var newDesc = req.body.desc;
    var newPrice = req.body.price;

    if (!newTitle || !newDesc || !newPrice) {
        res.status(412).send('You need to complete all fileds')
    } else {
        Product.findOneAndUpdate([{ "_id": productId }, { userId: currentUser }], { $set: { title: newTitle, description: newDesc, price: newPrice } }).exec((err, newProduct) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else if (!newProduct) {
                console.log(newProduct)
                res.status(412).send('Preconditions Failed !')
            } else {
                res.status(200).send({
                    success: true
                })
            }
        })
    }
})

app.delete('/products/:id', (req, res) => {

    var currentUser = req.token.username;
    var productId = req.params.id;

    Product.remove({ _id: productId, userId: currentUser }, function (err, product) {
        if (err) {
            res.status(500).send('Error in database')
        } else if (product.n === 0) {
            res.status(412).send('preconditions failed')
        } else {
            res.status(200).send({
                success: true
            })
        }
    });
});

app.listen(1407, function (err) {
    if (err) {
        console.log('Connection to the app on port 1407 failed');
    } else {
        console.log('app listening on port 1407');
    }
});