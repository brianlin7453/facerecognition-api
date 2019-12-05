const Clarifai = require('clarifai');

const scanner = new Clarifai.App({
  apiKey: '5d70a88d50e34db8bbfc91185578045e'
});

const handleApiCall = (req,res) =>{
	scanner.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data =>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('unable to work with API'))
}

const handleImage = (req,res,db)=>{
	const{id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}