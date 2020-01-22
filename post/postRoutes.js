const express = require('express');
const db  = require('../data/db')
const router = express.Router();

//POST

/*router.post('/',(req,res)=>{
    db.insert(req.body)
    .then(hub=>{
        res.status(201).json(hub)

    }) 
    .catch(error=>{
        res.status(500).json({errorMessage:"error"})
    })
})
/*router.post('/', async (req,res)=>{
    try{
        const post = await db.insert(req.body)
        res.status(201).json(post)
    } catch(error){
        res.status(500).json({errorMessage:"Error"})
    }
})



/*router.post('/',(req,res)=>{
    const postBody = req.body;
    if(!postBody.title || !postBody.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    } else {
        db.insert(postBody)
        .then(user =>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({errorMessage: "There was an error while saving the post to the database"})
        })

    }
})
/*
router.post('/:id/comments', (req,res)=>{
    const {id}= req.params;
    const userBody= req.body;
    .then(user => {
        if (!user){
            res.status(404).json({errorMessage:"The post with the specified ID does not exist."})
        } else if (!userBody.post_id){
            res.status(400).json({errorMessage:"Please provide text for the comment." })
        } else {
           db.insertComment(comment)
           .then((comment)=>{
               res.status(201).json(comment)
           })
        }

    .catch(error => {
        res.status(500).json({errorMessage:"There was an error while saving the comment to the database"});
    });
})
    */

    // GET
/*router.get('/', (req,res)=>{
    db.find()
    .then(data=>{
        res.json(data)
    })
    .catch(error =>{
        res.status(500).json({error:"The users information could not be retrieved."})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
         .then( 
            user => {
        if (!user){
            res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
        } else{
          res.status(200).json(user);  
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The user information could not be retrieved."});
    });  
});
router.get('/:id',  (req, res) => {
    const {id} = req.params;
     db.findById(id)
         .then( 
            user => {
        if (!user){
            res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
        } else{
          res.status(200).json(user);  
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The user information could not be retrieved."});
    });  
});

*/
router.get('/',async (req,res)=>{
    try{
        const posts= await db.find(req.query);
        res.status(200).json(posts)
    } catch(error) {
        console.log(error)
        res.status(500).json({errorMessage:"error"})
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const post = await db.findById(req.params.id);
        if(post){
            res.status(200).json(post);
            
        } else {
            res.status(404).json({message:"error"})
        }
    } catch (error) {
        res.status(500).json({ message: error})
    }
})

router.get('/:id/comment', async (req,res)=>{
    try{
        const post = await db.findPostComments(req.params.id)
        if(post.length){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    } catch (error){
        res.status(500).json({errorMessage:"The comments information could not be retrieved." })
    }
})

router.post('/', async (req, res)=>{
    try {
        const{title, contents} = req.body
        if(!title || !contents){
            res.status(400).json(
                {errorMessage: "Please provide title and contents for the post."})

        } else {
            const post = await db.insert(req.body)
            res.status(200).json(post);
        } 
    } catch (error){
        res.status(500).json({errorMessage: "There was an error while saving the post to the database"})
    }
})
 
router.delete("/:id", async (req,res)=>{
    try {
        const posts = await db.remove(req.params.id)
        if(!posts){
            res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
            
        } else {
            res.status(200).json(posts)
        } 
    } catch (error){
        res.status(500).json({errorMessage: "The post could not be removed"});
    }
})

router.put("/:id", async (req,res)=>{
    try{
        const post = await db.update(req.params.id,req.body)
        if(!post){
            res.status(404).json({errorMessage:"The id with the specified ID does not exist"})
        } else {
            res.status(200).json(post)
        }
    } catch (error){
        res.status(500).json({errorMessage: "The post could not be updated"})
    }
})
 router.post('/:id/comment', async (req,res)=>{
    const messageInfo= {...req.body,post_id:req.params.id}
    try{
        const saved =await db.insertComment(messageInfo)
        res.status(201).json(saved)
    } catch(err){
        res.status(500).json({
            message: "error"
        })
    }
 })
module.exports = router;