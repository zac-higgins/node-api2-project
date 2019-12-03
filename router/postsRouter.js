const express = require('express'); //not sure if I need this
const db = require('../data/db')
const router = express.Router();
router.use(express.json());


// -------------- GET requests ------------------- //

//returns a list of all posts
router.get('/', (req, res) => {
    db.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
})

//returns a post by its ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post);
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });

})

//returns all of the comments for a given post, the post is found by its ID
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findPostComments(id)
        .then(comment => {
            if (comment.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(comment)
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({ error: "The comments information could not be retrieved." });
        });
})

module.exports = router;