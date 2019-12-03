const express = require('express'); //not sure if I need this
const db = require('../data/db')
const router = express.Router();
router.use(express.json());


// -------------- GET requests ------------------- //

//Returns an array of all the post objects contained in the database.
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

//Returns the post object with the specified id.
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

//Returns an array of all the comment objects associated with the post with the specified id.
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

// -------------- POST requests ------------------- //

//Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
    postData = req.body;

    if (!postData.title || !postData.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(postData)
            .then(post => {
                res.status(201).json({ postData })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })

    }
});

//Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res) => {

});

// -------------- PUT requests ------------------- //

//Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

// -------------- DELETE requests ------------------- //

//Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.

module.exports = router;