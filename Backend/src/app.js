require('dotenv').config()
const path = require('path');
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: true,
    credentials: true
}));

// Routes
const authRoutes = require('./routes/auth.routes')
const songRoutes = require('./routes/song.routes')

app.use('/api/auth', authRoutes)
app.use('/api/songs', songRoutes)

const publicPath = path.join(__dirname,'..','public'); 

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app