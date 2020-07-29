const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var parkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  nrc: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  rfid: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    default: "1",
  },
  gate: {
    type: String,
    default: "0",
  },
  retime: {
    type: Date,
  },
});

parkingSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  next();
});

parkingSchema.statics.compare = function (cleartext, encrypted) {
  return bcrypt.compareSync(cleartext, encrypted);
};

const User = mongoose.model("register", parkingSchema);

module.exports = User;
