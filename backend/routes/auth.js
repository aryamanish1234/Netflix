const router = require("express").Router();
const User = require("../models/user")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");

router.post("/register", async(req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    });
    try {
        const user = await newUser.save();
        res.status(200).json({
            Data: user,
        })
    } catch (err) {
        res.status(400).json({
            Error: err
        })
        console.log(err);
    }

})


// User Login 

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong Username or Password ");
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const Password = bytes.toString(CryptoJS.enc.Utf8);

        if (Password !== req.body.password) {
            res.status(401).json("Wrong Username or Password ");
        } else {
            const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
                process.env.SECRET_KEY, { expiresIn: "1d" }
            )
            const { password, ...info } = user._doc;
            res.status(200).json({
                info: accessToken
            });
        }
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }



})



module.exports = router;