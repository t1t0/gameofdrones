const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');

const app = express();


//settings
app.set('port', process.env.PORT || 4000 );

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/players', require('./routes/players'));
app.use('/api/rules', require('./routes/moves'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Starting the Server
app.listen(app.get('port'), ()=>{
    console.log(`Server Runnin on http://localhost:${app.get('port')}`);
});