const express = require("express");
const DataBase = require("../data/db.js");

const router = express.Router();



// *************  POST *************** //


router.post("/:id/comments", (req, res) => {

    // const commentsPost = req.body;
    // DataBase.insertComment(commentsPost)
    //     .then(comments => {
    //         res.status(201).json(comments)
    //     })
    //     .catch(err =>{
    //         console.log(err.comments)
    //         res.status(404).json({message: "The post with the specified ID does not exist."})
    //     })
  
    const id = req.params.id;
    // const text = req.body.text;

    // const post_id = req.body.post_id
    // console.log(post_id, "PPPPOOOOSSSTTTT____IIIIDDDD")

    DataBase.findById(id)
        .then(id => {
            console.log(id, "ID ID ID ID ID ID ID ID ID ID")

            if(!id){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                DataBase.insertComment(req.body)
                    .then(comment => {
                        console.log(comment, "COMMENTS COMMENTS COMMENTS")

                        if(comment){
                            res.status(201).json(comment) 
                        } else {
                           res.status(400).json({ errorMessage: "Please provide text for the comment." })
                        }
                    })
                    .catch(error => {
                        // console.log(error);
                        res.status(500).json({ error: "There was an error while saving the comment to the database" })
                    })                
            }

        })        

})

// *************  GET *************** //

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



module.exports = router