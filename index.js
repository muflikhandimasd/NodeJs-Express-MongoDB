const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_DB_CONFIG} = require("./config/app.config");
const errors = require("./middleware/errors");

// to set globally
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology :true
}).then(
    () => {
        console.log("Database Connected");
    },
    (error) => {
        console.log("Database can't be connected: " + error);
    }
);

// to handling all the request
app.use(express.json());
// make it public with static
app.use('/uploads', express.static('uploads'));
app.use('/api', require("./routes/app.routes"));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000 ,function(){
    console.log("Ready to Go");
});