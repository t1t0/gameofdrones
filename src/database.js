const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://m001-student:vem051903@cluster0-qvkdz.mongodb.net/gameofdrones?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,})
    .then(db=>console.log('App Conected to MongoDB'))
    .catch(err=>console.error(err));

