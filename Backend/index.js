const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
//CXgPO7EW886oS39R
// MongoDB connection
mongoose.connect('mongodb+srv://mdeconozzama:CXgPO7EW886oS39R@cluster0.oc0hs.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// Import routes
const usersRouter = require('./routes/topUser');
app.use('/api/users', usersRouter);

const auth = require('./Auth/auth');
app.use('/api', auth);

const verify = require('./Auth/verifytoken');
app.use('/api/verifyToken', verify);

const loan = require('./routes/loan.js');
app.use('/api/loan', loan);
const deposite = require('./routes/deposite.js');
app.use('/api/deposite', deposite);
const withdraw = require('./routes/withdraw.js');
app.use('/api/withdraw', withdraw);



// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
