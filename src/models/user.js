const mongoose = require("mongoose");
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
  },
  password: {
    type: String,
    required: true,
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