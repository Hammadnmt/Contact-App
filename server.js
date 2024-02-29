const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const contactRoutes = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const connection =require('./config/db')
connection()

//PORT
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Routes
app.use('/api/contact', contactRoutes)
app.use('/api/user', userRoutes)
//Middleware for handling errors
app.use(errorHandler);

//Server listening 
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})




