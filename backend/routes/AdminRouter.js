const express = require('express');
const { MustBeSigned } = require('../middleware/authenticate');
const { loginController, AdminController, testController } = require('../controllers/admincontroller');
const { AdminModel } = require('../model/Admin.model');

const AdminRouter = express.Router();

// DEBUG: show all admins in DB
AdminRouter.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find({});
    res.send(admins);
  } catch (error) {
    res.send({ "msg": error.message });
  }
});

// ROUTES
AdminRouter.post("/register", AdminController);
AdminRouter.post("/login", loginController);

module.exports = { AdminRouter };
