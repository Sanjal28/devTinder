const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth");


// send connection request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try{
      const user=req.user;
      res.send(user.firstName+" has sent connection request");
    }catch(err){
      res.send("Error in sending connection request: "+err.message);
    }
  });

module.exports=requestRouter;