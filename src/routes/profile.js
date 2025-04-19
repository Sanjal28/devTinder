const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validate");


// profile of user
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.send("Error in fetching profile: " + err.message);
    }
  });

// update profile of user
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid data");
        }
        const user=req.user;
        Object.keys(req.body).forEach((key)=>{
            user[key]=req.body[key];
        });
        await user.save();
        res.status(200).send({
          message: `${user.firstName} Profile updated successfully`,
          data: user, // Send the updated user object
        });
          }catch(err){
        res.send("Error in updating profile: "+err.message);
    }
})

module.exports=profileRouter;