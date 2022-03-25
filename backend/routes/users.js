const router = require("express").Router();
const User = require("../models/user");
const Crypto = require("crypto-js");
const user = require("../models/user");
const verify = require('../middleware/varifytoken')




//Get 

router.get('/find/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(400).json(err);
    }
});


//GET ALL 
router.get('/', verify, async(req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.sort({ _id: -1 }).find().limit(10) : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    } else {
        res.status(403).json("You can not Allow ")
    }
})






// Delete 
router.delete('/:id', verify, async(req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User  has Delete..");
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json("You can not Delete this User ")
    }
})



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

// GET Users Static According to Month 
router.get("/stats", async(req, res) => {
    const today = new Date();
    const last = today.setFullYear(today.setFullYear() - 1);

    /* const monthArray = [
         "January",
         "Febuary",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "Octember",
         "November",
         "December"
     ];*/
    try {
        const data = await User.aggregate([{
            $project: {
                month: { $month: "$createdAt" }
            }
        }, {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }]);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err)
    }

})




module.exports = router;