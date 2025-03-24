const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// send connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status:" + status });
      }
      // Prevent self-request---i've  written in schema level
      //  if (fromUserId.toString() === toUserId) {
      //   return res.status(400).json({ message: "You cannot send a request to yourself" });
      // }
      // to check if  toUserId exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User does not exist" });
      }
      // to check if request already sent
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, //a -> b
          { fromUserId: toUserId, toUserId: fromUserId }, //b -> a
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already sent" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: `${status} request sent to user: ${toUser.firstName}`,
        data: data,
      });
    } catch (err) {
      res.send("Error in sending connection request: " + err.message);
    }
  }
);
// review connection request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const allowedStatus = ["accepted", "rejected"];
      const { status, requestId } = req.params;
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status:" + status });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: req.user._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(400).json({ message: "Invalid request" });
      }
      connectionRequest.status = status;
      await connectionRequest.save();
      res.json({
        message: "Request " + status,
        data: connectionRequest,
      });
    } catch (err) {
      res.send("Error : " + err.message);
    }
  }
);

module.exports = requestRouter;
