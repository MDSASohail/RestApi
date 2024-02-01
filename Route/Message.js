const route=require('express').Router();

const messageSchemma=require('../Model/Message')
route.post('/',async(req,res)=>{

    //    const data=req.body;
    //    console.log(data)
    //    res.json(data);
       const me=new messageSchemma({
        senderId:req.body.senderId,
        conversationId:req.body.conversationId,
        text:req.body.text
       })


       try{
             const savedMSG=await me.save();
             res.status(200).json(savedMSG)
       }catch(err)
       {
          res.status(500).json(err)
       }
})


route.get('/:conversationId',async(req,res)=>{
    try{
        const conver=await messageSchemma.find({conversationId:req.params.conversationId})
        
        res.status(200).json(conver)
    }catch(err){
       res.status(500).json(err);
    }
})



module.exports=route;