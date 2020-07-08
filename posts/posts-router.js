const express = require("express");
const DataBase = require("../data/db.js");
const { Database } = require("sqlite3");

const router = express.Router();

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

router.post("/:id/comments", (req, res) => {
    // const id = req.params.id;
    // const text = req.body.text;

    DataBase.findById(req.body.id)
        .then(post => {
            if(!post){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            DataBase.insertComment(req.body.text)
                .then(comment => {
                    if(!comment){
                        res.status(400).json({ errorMessage: "Please provide text for the comment." })
                    } else {
                        res.status(201).json(comment)
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
                })
        })        
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })

})

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

router.get("/:id/comments", (req, res) => {
    DataBase.findCommentById(req.params.id)
            .then(comment => {
                if(comment){
                    res.status(200).json(comment)
                }else {
                    res.status(404).json({ message: "The comment with the specified ID does not exist." })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "The comments information could not be retrieved." })
            })
})

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

router.put("/:id", (req, res) => {
    const changes = req.body
    DataBase.update(req.params.id, changes)
        .then(post => {
            if(!changes.title || !changes.contents){
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            } else if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified."  })
        })
})






module.exports = router;