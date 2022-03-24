const router = require("express").Router();
const User = require("../models/user");
const Crypto = require("crypto-js");
const user = require("../models/user");
const verify = require('../middleware/varifytoken')



//Update 

router.put("/:id", verify, async(req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            rq.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(user);
        } catch (err) {
            res.status(401).json(err);
        }
    } else {
        res.status(403).json("You can only Update Your Account ")
    }
})





module.exports = router;