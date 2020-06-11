const express = require('express');
const router = express.Router();

const { Favorite } = require("../models/Favorite");

const { auth } = require("../authentication/auth");

router.post("/addToFavorite", (req, res) => {
    
    const favorite = new Favorite(req.body);

    favorite.save((err) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/removeFromFavorite", (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userId: req.body.userId })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});

router.post("/getFavoredMovie", (req, res) => {

    //Need to find all of the Users that I am subscribing to From Subscriber Collection 
    Favorite.find({ 'userId': req.body.userId })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })
});

router.post("/favorited", (req, res) => {

    Favorite.find({ "movieId": req.body.movieId, "userId": req.body.userId })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (subscribe.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, subcribed: result })
        })

});

module.exports = router;