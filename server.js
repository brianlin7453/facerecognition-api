const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const database = {
	users:[
		{
			id: '123',
			name: 'john',
			email: 'john123@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'sally',
			email: 'sally123@gmail.com',
			password: 'strawberry',
			entries: 0,
			joined: new Date()
		}
	],
	login:[
	{
		id:'987',
		hash:'',
		email:'john123@gmail.com'
	}
	]
}
app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{
	/*bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
	});
	bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    // res == false
	});*/
	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
		res.json(database.users[0]);
	}
	else{
		res.status(400).json('error logging in')
	}
})

app.post('/register',(req,res)=>{
	const {email,name,password} = req.body;
	
	//bcrypt.hash(password, saltRounds, function(err, hash) {
  	// Store hash in your password DB.

	//});

	database.users.push({
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
	})
	res.json('added new user')
})

app.get('/profile/:id',(req,res)=>{
	const{id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(400).json('not found');
	}
})

app.put('/image',(req,res)=>{
	const{id} = req.body;
	database.users.forEach(user => {
		if (user.id === id){
			user.entries++;
			return res.json(user.entries);
		}
	})
})





app.listen(3001,()=>{
	console.log('app is running on port 3001');
})