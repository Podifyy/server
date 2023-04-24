const express = require('express');
const adminRouter = express.Router();
const {Podcast} = require("../models/podcast");
const admin = require('../middleware/admin');
adminRouter.post('/admin/add-podcast', admin, async(req, res) => {
    try{
        const {name, images, url} = req.body;
        let podcast = new Podcast({name, images, url});
        podcast = await podcast.save();
        res.json(podcast);
    }catch(e){res.status(500).json({error: e.message})}
});

adminRouter.get('/admin/get-podcast', admin, async(req, res) => {
    try{
        const podcasts = await Podcast.find({});
        res.json(podcasts);
    }catch(e){res.status(500).json({error: e.message})}
});

adminRouter.delete('/admin/delete-podcast/:name', admin, async(req, res) => {
    try{
        const deleteProduct = await Podcast.findOneAndDelete({name: req.params.name});
        res.json(deleteProduct);
    }
    catch(e){res.status(500).json({error: e.message})}
});

module.exports = adminRouter;