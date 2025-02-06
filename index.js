const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose")
const dotenv = require ("dotenv")

dotenv.config()
const mongo = process.env.mongoURL
const user = require ("./schema")
app.use(express.json())

const app = express();
const port = 3010;

app.use(express.static('static'));
mongoose.connect(mongo).then(()=>{
  console.log("Connected to Database")
})
.catch((error)=>{
  console.log(error)
})
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.put('/menu/:id',async(req,res)=>{
  try {
    let id = req.params.id
    const updatedId = await user.findByIdAndUpdate(id,req.body,{new:true})
    if (!updatedId){
      return res.send("item not found")

    }
    return res.status(200).json({"message":"Updated item sucessfully"})
    
  } catch (error) {
    res.status(500).json({"error":error})
    
  }
})

app.delete('/menu/:id',async(req,res)=>{
  try {
    let id = req.params.id
    const deletedId = await user.findByIdAndDelete(id)
    if (!deletedId){
      return res.send("item not found")

    }
    return res.status(200).json({"message":"Deleted item sucessfully"})
    
  } catch (error) {
    res.status(500).json({"error":error})
    
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
