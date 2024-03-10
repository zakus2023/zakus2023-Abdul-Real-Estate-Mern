import mongoose from 'mongoose'

//creating the user schemer
const userSchemer = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    }

}, {timestamps:true}); //this adds two extra information, time of creating the user and time of updating the user


//creating the model

const User = mongoose.model('User', userSchemer);

export default User; // exporting the user model so that you can use it anywhere in the project
