const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users')

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://Utkarsh1602:Richestman02@cluster0.liilxc0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.get('/getUsers', (req, res)=>{
    UserModel.find()
    .then((users)=> res.json(users))
    .catch((err)=> res.status(400).json('Error: ' + err))
})

app.post('/addUser', (req, res) => {
    const newUser = new UserModel({
      name: req.body.name,
      items: req.body.items,
      quantity: req.body.quantity,
      price: req.body.price,
    });
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})