const express = require('express');
const bodyParser = require('body-parser');

const mongo =  require('mongodb').MongoClient;
const objectId =  require('mongodb').ObjectID;

const assert = require('assert');
const url = 'mongodb://localhost:27017/test'; 
//const url = 'mongodb://heroku_p5s6f5f0:jvec771hijps61lc94m2pcc4ue@ds145019.mlab.com:45019/heroku_p5s6f5f0'; 


const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// routes
//const authRoutes = require('./server/routes/auth');
//app.use('/auth', authRoutes);


app.get('/zeroall', function(req, res, next){
	console.log("drop all....")

	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('students').remove({})
		db.collection('programs').remove({})
		db.collection('groups').remove({})
		db.collection('exercises').remove({})
		db.collection('templates').remove({})
		db.close()
			
	})

	res.redirect('/')
})



app.get('/startload', function(req, res, next){
	console.log("start load")

	let user0 = { id: 0, name: "Select a Student", isCoach:false, isAdmin:false }	
	let user1 = { id: 1, name: "Bob Dylan", isCoach:false, isAdmin:false }
	let user2 = { id: 2, name: "Miranda Kerr", isCoach:false, isAdmin:false }
	let user3 = { id: 3, name: "Dalai Lama", isCoach:false, isAdmin:false }
	let user4 = { id: 4, name: "Gal Gadot", isCoach:false, isAdmin:false }
	let template0 = { id: 0, name: "none" }


	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('students').insertOne(user0, function(err, result){
				assert.equal(null, err)
				console.log('insert user ok...')
		})
		db.collection('students').insertOne(user1, function(err, result){
				assert.equal(null, err)
				console.log('insert user ok...')
		})
		db.collection('students').insertOne(user2, function(err, result){
				assert.equal(null, err)
				console.log('insert user ok...')
		})
		db.collection('students').insertOne(user3, function(err, result){
				assert.equal(null, err)
				console.log('insert user ok...')
		})
		db.collection('students').insertOne(user4, function(err, result){
				assert.equal(null, err)
				console.log('insert user ok...')
		})

		db.collection('templates').insertOne(template0, function(err, result){
				assert.equal(null, err)
				console.log('insert template ok...')
		})

		db.close()
			
	})

	res.redirect('/')
})



app.post('/inserttemplate', function(req, res, next){
	console.log("insert template")
	var newtemplate = {
		name: req.body.template.name,
		weeks: req.body.template.weeks,
		createdby: req.body.template.createdby
	}	

	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('templates').insertOne(newtemplate, function(err, result){
				assert.equal(null, err)
				db.close()
				console.log('insert template ok...')
		})
	})

	res.redirect('/')
})

app.post('/removetemplate', function(req, res, next){
	console.log("remove template")
	console.log(req.body.template_id)

	if (typeof(req.body.template_id) != "undefined")
	{
		console.log("DEFINED")
		let dbid=req.body.template_id
		mongo.connect(url, function(err, db){
			assert.equal(null, err)
			db.collection('templates').remove({"_id":objectId(dbid)} , true, function(err, result){
				assert.equal(null, err)
				console.log("template removed")
				db.close()
			})
		})
	} else {
		console.log("TEMPLATE ID UNDEFINED")
	}
	res.redirect('/')
})



app.get('/gettemplates', (req, res) => {
	console.log("GET TEMPLATES")
	var dbtemplates = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		var cursor = db.collection('templates').find({})
		cursor.forEach(function(doc,err) {
			assert.equal(null,err)
			//console.log("doc")
			//console.log(doc)
			dbtemplates.push(doc)
		}, function(){
			db.close()
			console.log(dbtemplates)
			res.send(dbtemplates)
		})
	})
}); 

app.post('/upsertprogram', function(req, res, next){
	console.log("insert program")
	//	console.log("req.body")
	//	console.log(req.body)
	//console.log("program._id")
	//console.log(req.body.program._id)
	console.log("req.body.program.createdby")
	console.log(req.body.program)

	var item = {
		id: req.body.program.id,
		user: req.body.user,
		name: req.body.program.name,
		endcycle:req.body.program.endcycle,
		weeks: req.body.program.weeks,
		createdby:req.body.program.createdby
	}	

	if (typeof(req.body.program._id) != "undefined")
	{
		console.log("DEFINED")
		let dbid=req.body.program._id
		mongo.connect(url, function(err, db){
			assert.equal(null, err)
			db.collection('programs').updateOne({"_id":objectId(dbid)}, {$set: item}, function(err, result){
				assert.equal(null, err)
				console.log("program updated")
				db.close()
			})
		})
	} else {
		console.log("UNDEFINED")
		mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('programs').insertOne(item, function(err, result){
				assert.equal(null, err)
				db.close()
				console.log('insert program ok...')
			})
		})
	}

	res.redirect('/')
})

app.post('/removeprogram', function(req, res, next){
	console.log("remove program")
	//	console.log("req.body")
	//	console.log(req.body)
	console.log("program._id")
	console.log(req.body.program_id)

	if (typeof(req.body.program_id) != "undefined")
	{
		console.log("DEFINED")
		let dbid=req.body.program_id
		mongo.connect(url, function(err, db){
			assert.equal(null, err)
			db.collection('programs').remove({"_id":objectId(dbid)} , true, function(err, result){
				assert.equal(null, err)
				console.log("program removed")
				db.close()
			})
		})
	} else {
		console.log("PROGRAM ID UNDEFINED")
	}
	res.redirect('/')
})


app.get('/getprograms', (req, res) => {
	console.log("GET PROGRAMS")
	var dbprograms = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		var cursor = db.collection('programs').find({})
		cursor.forEach(function(doc,err) {
			assert.equal(null,err)
			//console.log("doc")
			//console.log(doc)
			dbprograms.push(doc)
		}, function(){
			db.close()
			console.log(dbprograms)
			res.send(dbprograms)
		})
	})
}); 

app.get('/getstudents', function(req, res, next){
	console.log("GET STUDENTS")
	var dbstudents = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		var cursor = db.collection('students').find({})
		cursor.forEach(function(doc,err) {
			assert.equal(null,err)
			dbstudents.push(doc)
		}, function(){
			db.close()
			console.log(dbstudents)
			res.send(dbstudents)
		})
	})
})



app.post('/insertstudent', function(req, res, next){
	console.log("no insertstudent body")
	console.log("req.body")
	console.log(req.body)
	//let avatar_img="images/"
	//if(req.body.img=='') {
	//	avatar_img=avatar_img+"avatar64"+req.body.gender+".png"
	// else {
	//	avatar_img=avatar_img+req.body.img
	//}

	var item = {
		id: req.body.id,
		name: req.body.name,
		age: req.body.age,
		weight: req.body.weight,
		gender:req.body.gender,
		isCoach: req.body.isCoach,
		isAdmin: req.body.isAdmin
	}	

	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('students').insertOne(item, function(err, result){
			assert.equal(null, err)
			console.log('insert student ok...')
			db.close()
		})
	})
	res.redirect('/')
})

app.post('/deletestudent', function(req, res, next){
	let id = req.body.id;
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('students').deleteOne({"_id":objectId(id)}, function(err, result){
			console.log("before assert", err)
			assert.equal(null, err)
			console.log("student deleted")
			db.close()
		})
	})
	res.redirect('/')
})

app.post('/updatestudent', function(req, res, next){
	let id = req.body.id;
	var student = {
		name: req.body.name,
		age: req.body.age,
		weight: req.body.weight,
		gender: req.body.gender,
		isCoach: req.body.isAdmin,
		isAdmin: req.body.isAdmin

	}
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('students').updateOne({"_id":objectId(id)}, {$set: student}, function(err, result){
			assert.equal(null, err)
			console.log("student updated")
			db.close()
		})
	})
	res.redirect('/')	
})


app.get('/students', (req, res) => {	
	res.send(students);
}); 

app.get('/createstudents', (req, res) => {
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('studentsx').insert(students, function(err, result) {
			assert.equal(null, err)
			console.log("students inserted")
			db.close()			
		});
	})
}); 


app.get('/getstudents', (req, res) => {
	var dbstudents = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		var cursor = db.collection('students').find()
		cursor.forEach(function(doc,err) {
			assert.equal(null,err)
			//console.log("doc")
			//console.log(doc)
			dbstudents.push(doc)
		}, function(){
			db.close()
			res.send(dbstudents)
		})
	
	})
}); 



app.get('/addstudent', (req, res) => {
	var item = 	{id:1, name:"Grace Ng", img:'images/c2.png'}	
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		db.collection('studentscol').insertOne(item, function(err, result) {
			assert.equal(null, err)
			console.log("item inserted")
			db.close()			
		});
	})
}); 


app.get('/getexercises', (req, res) => {
	console.log("GET EXERCISES")
	var dbexercises = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		var cursor = db.collection('exercises').find({})
		cursor.forEach(function(doc,err) {
			assert.equal(null,err)
			//console.log("doc")
			//console.log(doc)
			dbexercises.push(doc)
		}, function(){
			db.close()
			console.log(dbexercises)
			res.send(dbexercises)
		})
	})
}); 


app.get('/createexercises', (req, res, next) => {

	let exercises = [ 
			{id:1, group:"Triceps", name:"Tricep Straight Bar Pushdowns (Cable Machine)"},
			{id:2, group:"Triceps", name:"Tricep Rope Pulldowns (Cable Machine)"},
			{id:3, group:"Triceps", name:"Tricep Skull Crushers (Curl Bar)"},
			{id:4, group:"Triceps", name:"Tricep Close Grip Bench Press (Barbell)"},
			{id:5, group:"Triceps", name:"Tricep Kickback (Dumbbell)"},
			{id:6, group:"Biceps", name:"Bicep Concentration Curl (Dumbbell)"},
			{id:7, group:"Biceps", name:"Bicep Seated Curl (Dumbbell)"},
			{id:8, group:"Biceps", name:"Bicep Preacher Curl (Curl Bar)"},
			{id:9, group:"Biceps", name:"Bicep Curl (Barbell)"},
			{id:10, group:"Quadricep Compound", name:"Hack Squat (Machine)"},
			{id:11, group:"Quadricep Compound", name:"Front Squat (Barbell)"},
			{id:12, group:"Quadricep Compound", name:"Leg Press"},
			{id:13, group:"Quadricep Isolation", name:"Leg Extensions"},
			{id:14, group:"Quadricep Isolation", name:"Leg Extensions (Single Leg)"},
			{id:15, group:"Quadricep Isolation", name:"Static Lunge (Dumbbell)"},
			{id:16, group:"Quadricep Isolation", name:"Rear Foot Elevated Lunge"},
			{id:17, group:"Hamstring Compound", name:"Stiff Legged Deadlift (Barbell)"},
			{id:18, group:"Hamstring Isolation", name:"Hamstring Curls (Machine)"},
			{id:19, group:"Hamstring Isolation", name:"Single Hamstring Curls (Machine)"},
			{id:20, group:"Glutes", name:"Glute Bridge (Barbell)"},
			{id:21, group:"Calves", name:"Standing Calf Raise (Machine)"},
			{id:22, group:"Calves", name:"Seated Calf Raise (Machine)"},
			{id:23, group:"Chest Compound", name:"Decline Chest Press (Dumbbell)"},
			{id:24, group:"Chest Compound", name:"Decline Chest Press (Barbell)"},
			{id:25, group:"Chest Compound", name:"Flat Chest Press (Dumbbell)"},
			{id:26, group:"Chest Compound", name:"Chest Press Machine"},
			{id:27, group:"Chest Isolation", name:"Chest Cable Fly (Machine)"},
			{id:28, group:"Chest Isolation", name:"Decline Fly (Dumbbell)"},
			{id:29, group:"Chest Isolation", name:"Flat Bench Fly (Dumbbell)"},
			{id:30, group:"Shoulder", name:"Standing Shoulder Press (Barbell)"},
			{id:31, group:"Shoulder", name:"Seated Shoulder Press (Barbell)"},
			{id:32, group:"Shoulder", name:"Seated Shoulder Press (Dumbbell)"},
			{id:33, group:"Shoulder", name:"Machine Shoulder Press"},
			{id:34, group:"Lateral Deltoid", name:"Shoulder Side Lateral Raise (Dumbbell)"},
			{id:35, group:"Lateral Deltoid", name:"Upright Row"},	
			{id:36, group:"Posterior Deltoid", name:"Shoulder Reverse Fly (Machine)"},
			{id:37, group:"Posterior Deltoid", name:"Shoulder Reverse Fly - Chest Supported (Dumbbell)"},	
			{id:38, group:"Back", name:"Lat Pulldown (Underhand + Narrow Grip)"},	
			{id:39, group:"Back", name:"Lat Pulldown (Regular Overhand Grip)"},	
			{id:40, group:"Back", name:"Single Arm Row (Dumbbell)"},	
			{id:41, group:"Back", name:"Bent Over Row (Barbell)"},	
			{id:42, group:"Back", name:"Chin up (Underhand Grip)"},	
			{id:43, group:"Back", name:"Chin up (Overhand Grip)"},	
			{id:44, group:"Back", name:"Chest Supported Row (Dumbbell)"},	
			{id:45, group:"Back", name:"Seated Cable Row"},	
			{id:46, group:"Back", name:"Machine Back Row (Machine of choice with a chest support)"},	
			{id:47, group:"Back", name:"Close Grip Attachment Pulldown"},
			{id:48, group:"Abdominals", name:"Crunch With Arms Extended"},	
			{id:49, group:"Abdominals", name:"Hanging Leg Raises"},	
			{id:50, group:"Abdominals", name:"Lying Leg Raises"},	
			{id:51, group:"Abdominals", name:"Oblique Side Bends (Dumbbell)"},
			{id:52, group:"Squat", name:"Front Squat (Barbell)"},  
			{id:53, group:"Squat", name:"Leg Press"},  
			{id:54, group:"Squat", name:"Smith Machine Squat"},
			{id:55, group:"Squat", name:"Hack Squat (Machine)"},	  
			{id:56, group:"Dead Lift", name:"Rack Pulls (Barbell)"},	  
			{id:57, group:"Dead Lift", name:"Sumo Dumbbell Dead Lift"},	  
			{id:58, group:"Dead Lift", name:"Sitff Legged Dead Lift"},	  
			{id:59, group:"Bench Press", name:"Decline Chest Press (Barbell)"},
			{id:60, group:"Bench Press", name:"Flat Chest Press (Dumbbell)"},
			{id:61, group:"Bench Press", name:"Machine Chest Press"},

		]	

	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		//console.log("removing exercises ")
		//db.collection('exercises').remove({})
		db.collection('exercises').insert(exercises, function(err, result) {
			assert.equal(null, err)
			console.log("exercises inserted")
			db.close()
			res.send(exercises)			
		});
	})
}); 


app.get('/getgroups', (req, res) => {
	console.log("GET GROUPS")
	var dbgroups = [];
	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		var cursor = db.collection('groups').find({})
		cursor.forEach(function(doc,err) {
			assert.equal(null,err)
			//console.log("doc")
			//console.log(doc)
			dbgroups.push(doc)
		}, function(){
			db.close()
			console.log(dbgroups)
			res.send(dbgroups)
		})
	})
}); 

app.get('/creategroups', (req, res, next) => {

	let groups = [
				{id:1, name:'Triceps'},
				{id:2, name:'Biceps'},
				{id:3, name:'Quadricep Compound'},
				{id:4, name:'Quadricep Isolation'},
				{id:5, name:'Hamstring Compound'},
				{id:6, name:'Hamstring Isolation'},
				{id:7, name:'Glutes'},
				{id:8, name:'Calves'},
				{id:9, name:'Chest Compound'},
				{id:10, name:'Chest Isolation'},
				{id:11, name:'Shoulder'},
				{id:12, name:'Lateral Deltoid'},
				{id:13, name:'Posterior Deltoid'},
				{id:14, name:'Back'},
				{id:15, name:'Abdominals'},
				{id:16, name:'Squat'},
				{id:17, name:'Dead Lift'},
				{id:18, name:'Bench Press'}
		]

	mongo.connect(url, function(err, db){
		assert.equal(null, err)
		//console.log("removing groups...")
		//db.collection('groups').remove({})
		db.collection('groups').insert(groups, function(err, result) {
			assert.equal(null, err)
			console.log("groups inserted")
			db.close()	
			res.send(groups)		
		});
	})
}); 




var port = process.env.PORT || '3000';
//app.set('port', port);

// start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
