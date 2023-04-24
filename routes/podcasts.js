const express = require('express');
const podcastRouter = express.Router();
const {Podcast} = require("../models/podcast");
const auth = require('../middleware/auth')

podcastRouter.get('/api/podcast/search/:name', auth, async(req, res) => {
    try{
        const podcast = await Podcast.find({name : {$regex: req.params.name, $options: 'i'}});
        res.json(podcast);
    }catch(e){res.status(500).json({error: e.message})}
});

podcastRouter.get('/api/top-podcasts', auth, async(req, res) => {
    try{
        let podcasts = await Podcast.find({});
        podcasts =  podcasts.sort((a,b) => {
            let aSum = 0;
            let bSum = 0;
            for(let i=0; i<a.ratings.length; i++){
                aSum += a.ratings[i].rating;
            }
            for(let i=0; i<b.ratings.length; i++){
                bSum += b.ratings[i].rating;
            }

            return aSum < bSum ? 1: -1;
        });

        res.json(podcasts[0]);
    }catch(e){res.status(500).json({error: e.message})}
});

podcastRouter.post('/api/rate-podcast', auth, async(req, res) => {
    try{
        const {id, rating} = req.body
        let podcasts = await Podcast.findById(id);
        for(let i=0; i<podcasts.ratings.length; i++){
            if(podcasts.ratings[i].userId == req.user){
                podcasts.ratings.splice(i, 1);
                break;
            }
        }
        const ratingSchema = {
            userId: req.user,
            rating,
        }
        podcasts.ratings.push(ratingSchema);
        podcasts = await podcasts.save();
        res.json(podcasts);
    }catch(e){res.status(500).json({error: e.message})}
});
module.exports = podcastRouter;