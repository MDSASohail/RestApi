const route=require("express").Router();
const postSchemma=require('../Model/Post');
//Create a post
route.post('/',async(req,res)=>{
    const post=new postSchemma({
        userId:req.body.userId,
        desc:req.body.desc,
        img:req.body.img 
    })

    try{
          const postedPost=await post.save();
          res.status(200).json(postedPost)
    }catch(err)
    {
        res.status(500).send(err)
    }
         
})


//delete a post
route.delete('/:id',async(req,res)=>{
    const getp=await postSchemma.findById(req.params.id);
    if(getp==null)
      {
        res.status(400).json({result:"Data not found"})
        return;
      }
    if(getp.userId===req.body.userId)
    {
        try{
            const deletedData=await postSchemma.findByIdAndDelete(req.params.id)
    
            res.status(200).json(deletedData)
        }catch(err)
        {
            res.status(500).json(err);
        }
    }
    else
    {
        res.status(500).json({result:"You are not allowed to delete this post"})
    }
})


//update a post
route.put('/:id',async(req,res)=>{

    const getp=await postSchemma.findById(req.params.id);

    if(getp==null)
    {
        res.status(400).json({result:"Post does't exist"})
        return;
    }
    if(getp.userId===req.body.userId)
    {
        try{
            const updatedData=await postSchemma.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
    
            res.status(200).json(updatedData)
        }catch(err)
        {
            res.status(500).json(err);
        }
    }
    else
    {
        res.status(500).json({result:"You are not allowed to update this post"})
    }
})

//like a post
route.put('/like/:id',async(req,res)=>{
    const post=await postSchemma.findById(req.params.id);
     try{
          if(!post.likes.includes(req.body.userId))
          {
             await post.updateOne({$push:{likes:req.body.userId}})
             res.status(200).json({result:"Liked"})
          }else
          {
             await post.updateOne({$pull:{likes:req.body.userId}})
             res.status(200).json({result:"Unliked"})    
          }

     }catch(err)
     {
        res.status(500).json({result:"Not working"})
     }
})

//All the post of a porticular user
route.get('/get/:id',async(req,res)=>{
    try{
         const all=await postSchemma.find({userId:req.params.id});
         res.status(200).json(all);
         console.log(all);
    }catch(err)
    {
        res.status(500).json(err);
    }
})

//get particular post by postId

route.get('/getp/:id',async(req,res)=>{
    try{
         const all=await postSchemma.findById(req.params.id)
         res.status(200).json(all);
    }catch(err)
    {
        res.status(500).json(err);
    }
})

//get all the posts
route.get('/all',async(req,res)=>{
    try {
        const all=await postSchemma.find();
        res.status(200).send(all);
        console.log("All post is "+all)
    } catch (error) {
        res.status(400).send(false);
    }
})
module.exports=route;