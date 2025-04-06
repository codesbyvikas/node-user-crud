const mongoose = require("mongoose");

async function connectMongoDb(url) {
    return mongoose.connect(url)
    .then(()=>console.log("Mongoose connected"))
    .catch((err)=>console.log("Erros",err));
}

module.exports = {
    connectMongoDb,
}