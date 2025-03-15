const mongoose = require("mongoose");
const validator=require("validator");
const userSchema = mongoose.Schema(
  {
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
    maxlength: 30,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Password is not strong");
      }
    }
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender date is not valid");
      }
    }
  },
  photoUrl:{
    type:String,
    default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("URL is not valid");
      }
    }
  },
  about:{
    type:String,
    default:"This is a  default about me",
  },
  skills:{
    type:[String],
  }
},
{
  timestamps:true,
}
);
const User=mongoose.model("user",userSchema);
module.exports=User;