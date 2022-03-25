const router = require("express").Router();
const Movie = require("../models/movie");
const verify = require('../middleware/varifytoken')






// Create Movie 
router.post("/", verify, async(req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        console.log(newMovie);

        try {
            const MovieData = await newMovie.save();
            res.status(200).json(MovieData);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json("You are Not Allowed")
    }
})


//Update Movie Data 

router.put("/:id", verify, async(req, res) => {

    if (req.user.isAdmin) {
        console.log(req.body);
        try {
            const UpdateData = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(UpdateData);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json("You are Not Allowed")
    }
})

// Delete Movies 


router.delete("/:id", verify, async(req, res) => {

    if (req.user.isAdmin) {
        console.log(req.body);
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("Movie Data Deleted ");
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json("You are Not Allowed")
    }
})


//GET Movie Data 

router.get("/find/:id", verify, async(req, res) => {
    try {
        const MovieData = await Movie.findById(req.params.id)
        console.log(MovieData);
        res.status(200).json(MovieData);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
})


// Get Random Movie 


router.get("/random", verify, async(req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ])
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(400).json(err);
    }
})

// GET ALL Movie 
router.get("/", verify, async(req, res) => {

    if (req.user.isAdmin) {
        try {
            const movie = await Movie.find();
            res.status(200).json(movie.reverse());
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json("You are Not Allowed")
    }
})






module.exports = router;