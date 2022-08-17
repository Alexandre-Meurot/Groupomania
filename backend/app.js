const express = require('express');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv').config();

// IMPORTS ROUTES
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

// INITIALISATION APPLICATION EXPRESS
const app = express();

// PARAMETRES EN-TETE CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SECURITE
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// PARAMETRES DES ROUTES
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;




