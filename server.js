const express = require('express');
const app = express();
app.use(express.json());

const users = [{name: 'Pepe', id: '1'}, {name: 'Juan', id: '2'}];
const throwDice = userNum => Math.floor(Math.random()*userNum + 1);

//GETS
app.get('/users', (req, res) => {
  res.json(users)
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);
  res.json(user);
})

app.get('/throw/:num', (req, res) => {
  const userNum = req.params.num;
  const result = [{result: throwDice(userNum)}];  
  res.json(result);  
})

//POST
app.post('/users', (req, res) => {
  const newUser = req.body;
  
  if(Object.keys(newUser).length === 0) {
    res.status(400).send('Debes pasarme algo en el body')
  } else {
    newUser.id = Math.random();
    users.push(newUser);
    res.json(newUser);
  }
})



app.listen(3000, () => console.log('Ready on port 3000!'))