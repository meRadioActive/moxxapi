const express = require('express');
const cors = require('cors');

const app = express();
let corsOptions = {
    origin: "http://localhost"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database

const db = require('./app/models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Connect to the database!`);
    })
    .catch(err => {
        console.log(`Cannot connect to the database!`, err);
        process.exit();
    });

app.all("*", (req, res, next) => {
    console.log(`===================================== \n URL: ${req.url} \n METHOD: ${req.method} \n ORIGINAL: ${req.originalUrl} \n PARAMS: ${JSON.stringify(req.params)} \n QUERY: ${JSON.stringify(req.query)} \n BODY: ${JSON.stringify(req.body)} \n =====================================`);
    next();
})

// Route links
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});