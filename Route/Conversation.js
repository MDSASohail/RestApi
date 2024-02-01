const route=require('express').Router();
const conversationSchemma=require('../Model/Conversation')
route.post('/',async(req,res)=>{
       const data=new conversationSchemma({
            members:[req.body.senderId,req.body.receiverId]
       })


       try{
            const saved=await data.save();
            res.status(200).json(saved);
       }catch(err){
        res.status(500).json(err);
       }
})

route.get('/:userId',async(req,res)=>{
      try{
          const conver=await conversationSchemma.find({members:req.params.userId})
          
          res.status(200).json(conver)
      }catch(err){
         res.status(500).json(err);
      }
})

module.exports=route