const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

//Post Method
app.post('/post', (req, res) => {
  res.send('Post API')
})

//Get all Method
app.get('/getAll', (req, res) => {
  res.send('Get All API')
})

//Get by ID Method
app.get('/getOne/:id', (req, res) => {
  res.send('Get by ID API')
})

//Update by ID Method
app.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

//Delete by ID Method
app.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})
