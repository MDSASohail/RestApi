const route=require('express').Router();
const userModel=require('../Model/User');
const cr=require('crypto-js')
//get a user by 
route.get('/get/:id',async(req,res)=>{
        try{
              const user=await userModel.findById(req.params.id);
              if(!user)
              {
                  res.status(404).json({result:"User not found"});
                  return;
              }
                  const {password,createdAt,updatedAt,...others}=user._doc;
              res.status(200).json(others);
        }catch(err)
        {
            res.json(err)
        }
})


//update
route.put('/update/:id',async(req,res)=>{
    if(req.params.id===req.body.userId || req.user.isAdmin)
    {

        console.log("In the if")

        console.log(req.body.password)
             if(req.body.password)
             {
                try{
                   req.body.password=cr.AES.encrypt(req.body.password,"mdsa").toString();
                    

                }catch(err)
                {
                    res.status(500).json(err)
                }
             }    

             try{
                    const update=await userModel.findByIdAndUpdate(req.params.id,{
                        $set:req.body
                    
                    },{new:true})

                    res.status(200).json(update)
             }catch(err){
                res.status(500).json({result:"failed to update"});
             }
    }
    else
    res.status(500).json({result:"You are not allowed to update"})
})

//delete a user by finding username
route.delete('/delete/:id',async(req,res)=>{
           if(req.body.userId===req.params.id || req.body.isAdmin)
           {
            try {
                const deletedUser=await userModel.findOneAndDelete(req.params.id)
                console.log(deletedUser)
                res.status(200).json(deletedUser)
        } catch (error) {
            res.status(500).json(error)
        }
           }
           else{
               res.status(500).json({result:"You cant delete the user"})
           }
})


route.put('/follow/:id',async(req,res)=>{

    if(req.body.userId!==req.params.id)
    {
         try{
             const user=await userModel.findById(req.params.id);
             const current=await userModel.findById(req.body.userId);
             console.log(user,current)
             if(!user.follower.includes(req.body.userId))
             {
                  await user.updateOne({$push:{follower:req.body.userId}})
                  await current.updateOne({$push:{following:req.params.id}})
                  res.json({result:"Followed"})
             }else
             {
                res.status(403).json({result:"You are already following"})
             }
         }catch(err)
         {
            res.status(500).json({result:"Error"})
         }
    }else{
        res.status(500).json({result:"You can't follow your self"})
    }

})


//unfollow
route.put("/unfollow/:id",async(req,res)=>{
    if(req.body.userId!==req.params.id)
    {
        const user=await userModel.findById(req.params.id);
        const current=await userModel.findById(req.body.userId);
        if(user.follower.includes(req.body.userId))
        {
            try{
                await user.updateOne({$pull:{follower:req.body.userId}})
                  await current.updateOne({$pull:{following:req.params.id}})
            res.status(200).json({result:"Unfollow"})
            }catch(err){
                res.status(500).json({result:err})
            }
        }else
        res.status(500).json({result:"You are already not following"})
    }else
    {
        res.status(500).json({result:"You can't unfollow yourself"})
    }
})








module.exports=route;