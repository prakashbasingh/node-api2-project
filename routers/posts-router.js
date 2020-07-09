const express = require("express");
const DataBase = require("../data/db.js");
// const { Database } = require("sqlite3");

const router = express.Router();

// *************  POST *************** //

router.post("/", (req, res) => {
    DataBase.insert(req.body)
            .then(post => {
                // console.log(post, "{:>{:>{:>{:><:}<:}<:}<:}")
                if(req.body.title && req.body.contents){
                    res.status(201).json(post)
                }else {
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
                }
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
})


// *************  GET *************** //

router.get("/", (req, res) => {
    DataBase.find(req.query)
            .then(posts => {
                res.status(200).json({query: req.query, data: posts})
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "The posts information could not be retrieved." })
            })
})

router.get("/:id", (req, res) => {

    DataBase.findById(req.params.id)
            .then(post => {
                if(post){
                    res.status(200).json(post)
                }else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "The post information could not be retrieved." })
            })
})


// *************  DELETE *************** //

router.delete("/:id", (req, res) => {
    DataBase.remove(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            res/status(500).json({ error: "The post could not be removed" })
        })

})

// *************  PUT *************** //

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if(changes.title || changes.contents){
            
        DataBase.update(id, changes)
            .then(count => {
                console.log(count, "kaiojbhdiaohgaihsdiauhesdaiuh")

                if (count === 1) {
                    res.status(200).json(count)
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "The post information could not be modified."  })
            })
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
})


module.exports = router;