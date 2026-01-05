const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    role: { type: String, default: "admin" }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Force exact collection name
const AdminModel = mongoose.model('Admin', AdminSchema, 'admin');

module.exports = { AdminModel };
