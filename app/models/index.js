const dbConfig = require('../config/db.config');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

//list of modules
db.user = require('./user.module')(mongoose)

module.exports = db;