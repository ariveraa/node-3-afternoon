require('dotenv').config(); 
const express = require('express'), 
app = express(),
massive = require('massive'),
products_ctrl =require('./products_controller'), 
{SERVER_PORT, CONNECTION_STRING} = process.env; 

app.use(express.json()); 

massive(CONNECTION_STRING).then(db => {app.set('db', db); console.log(`db connected`)})
.catch(err => console.log(err));

app.get('/api/products' , products_ctrl.getAll); 
app.get('/api/products/:id' , products_ctrl.getOne);
app.put('/api/products:id' , products_ctrl.update); 
app.post('/api/products' , products_ctrl.create); 
app.delete('/api/products/:id', products_ctrl.delete); 


const port = SERVER_PORT; 

app.listen(port , () => console.log(`Server running on ${port}`));