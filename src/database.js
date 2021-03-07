const mongoose = require('mongoose');

mongoose.connect('', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,})
    .then(db=>console.log('App Conected to MongoDB'))
    .catch(err=>console.error(err));

