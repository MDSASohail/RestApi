const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const authRoute = require('./Route/Auth');
const userRoute = require('./Route/User');
const postRoute = require('./Route/Post');
const cors = require('cors');
const multer = require('multer');
const path=require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();
app.use('/Images',express.static("Public/Images"))
mongoose
  .connect(process.env.mongo_pass)
  .then(() => {
    console.log('Connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan('common'));
app.use(helmet());
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
let namename=""



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder where the uploaded files will be stored
    cb(null, './Public/Images');
  },

  filename: function (req, file, cb) {
    // Specify how each file should be named
    namename=Date.now()+file.originalname;
    
    cb(null, namename);
  },
});

const upload = multer({ storage: storage });

app.post('/upload',upload.single('file'),  (req, res) => {
    console.log('In server, file name is ' + namename);
    console.log("body data i "+JSON.stringify(req.body.userId))
     console.log(req.body.desc);
    let id=req.body.userId;
    let desc=req.body.desc
    if (req.file) {
      // res.redirect(`http://localhost:8000/post/?userId=${id}&desc=${desc}&img=Images/${namename}`)
      res.send({img:namename});
    } else {
      return res.status(500).send('File not uploaded');
    }
  });

app.listen(8000, () => {
  console.log('Server is started');
});
