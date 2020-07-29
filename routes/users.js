var express = require("express");
var router = express.Router();
var Register = require("../models/register");
var bcrypt = require("bcryptjs");

var auth = function (req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect("/user/login");
  }
};

router.get("/profile", auth, function(req, res) {
  Register.findById(req.session.user.id, function (err, rtn) {
    if (err) throw err;
    res.render("user/profile", { user: rtn });
  });
});

router.get("/login", function (req, res, next) {
  res.render("user/userlogin");
});


router.post("/login",function(req,res){
  Register.findOne({ $or:[{email:req.body.id},{rfid: req.body.id}]},function(err,rtn){
    if(err) throw err;
    if(rtn != null && Register.compare(req.body.password,rtn.password)){
      req.session.user = {name:rtn.name,email:rtn.email, id:rtn._id};
      res.redirect("/user/profile");
    }else{
      res.redirect("/user/login");
    }
  })
})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/user/login");
});

router.post("/update", function (req, res) {
  var update = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    nrc: req.body.nrc,
    mobile: req.body.mobile,
  };
  Register.findByIdAndUpdate(req.body.id, { $set: update }, function (
    err,
    rtn
  ) {
    if (err) throw err;
    res.redirect("/user/profile");
  });
});

router.post("/duemail", (req, res) => {
  Register.findOne({ email: req.body.email }, function (err, rtn) {
    if (err) throw err;
    if (rtn != null) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  });
});

module.exports = router;
