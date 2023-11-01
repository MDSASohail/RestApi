const route=require('express').Router();
const userModel=require('../Model/User');
const cryptojs=require('crypto-js');
route.post('/register',async(req,res)=>{
    const encPassword=cryptojs.AES.encrypt(req.body.password,"mdsa");
    const user=new userModel({
        username:req.body.username,
        password:encPassword,
        email:req.body.email
    })

    try{
         const savedUser=await user.save();
         res.status(200).json(savedUser)
    }catch(err){
        res.json(err);
    }
})

//login

route.post('/login',async(req,res)=>{
             try {
                     const user=await userModel.findOne({username:req.body.username});

                     if(!user)
                     {
                        res.status(404).json({result:"User does't exist"});
                        return;
                     }

                    
                     const dPassword=cryptojs.AES.decrypt(user.password,"mdsa").toString(cryptojs.enc.Utf8);
                     if(dPassword!=req.body.password)
                      {
                         res.status(400).json({result:"Wrong password"})
                      }
                      else
                      {
                        res.status(200).json(user)
                      }
             } catch (error) {
                res.json(error);
             }
})
module.exports=route;