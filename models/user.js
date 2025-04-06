const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    fistName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
    },
    // jobTitle:{
    //     type:String,
    // }
},{
    timestamps:true
},
);

const User = mongoose.model('user',userSchema);

module.exports = User;