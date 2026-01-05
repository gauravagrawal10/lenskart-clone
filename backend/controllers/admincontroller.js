const JWT = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { AdminModel } = require("../model/Admin.model");

/* ================= REGISTER ADMIN ================= */
const AdminController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await AdminModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).send({ success: false, message: "Admin already registered, please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role: "admin"
    });

    res.status(201).send({
      success: true,
      message: "Admin registered successfully",
      admin: { _id: admin._id, name: admin.name, email: admin.email, phone: admin.phone, role: admin.role }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in admin registration" });
  }
};

/* ================= ADMIN LOGIN ================= */
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ success: false, message: "Email and password are required" });

    const normalizedEmail = email.trim().toLowerCase();
    console.log("Login attempt for:", normalizedEmail);

    const admin = await AdminModel.findOne({ email: normalizedEmail, role: "admin" });
    console.log("Found admin:", admin);

    if (!admin) return res.status(401).send({ success: false, message: "Admin not registered" });

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);
    if (!isMatch) return res.status(401).send({ success: false, message: "Invalid password" });

    const privateKey = process.env._PRIVATE_KEY || 'cleardekho_admin_secret_key_2024';
    const token = JWT.sign({ id: admin._id, role: admin.role, email: admin.email }, privateKey, { expiresIn: "7d" });

    res.status(200).send({
      success: true,
      message: "Admin login successful",
      admin: { _id: admin._id, name: admin.name, email: admin.email, phone: admin.phone, role: admin.role },
      token
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).send({ success: false, message: "Error in admin login", error: error.message });
  }
};

/* ================= TEST ================= */
const testController = (req, res) => res.send("Protected Admin Route");

module.exports = { AdminController, loginController, testController };
