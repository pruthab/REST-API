const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
 res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
 res.send(courses);
});

app.post('/api/courses', (req, res) => {
    
 const {error} = validateCourse(req.body);// instead of result.error
 if (error){
     res.status(400).send(error.details[0],message);
     return;
} 

 const course = {
 id: courses.length + 1,
 name: req.body.name,
 };
 courses.push(course);
 res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
// look up the course
//if not exixt, return 404
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) {
    res.status(404).send('the course with the given id was not found');
    return;
}
//validation

const {error} = validateCourse(req.body);// instead of result.error
if (error){
    res.status(400).send(error.details[0],message);
    return;
}
//update course
//return the updated course
course.name = req.body.name;
res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return  Joi.validate(course, schema);
};

app.delete('/api/courses/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if(!course) {
   res.status(404).send('the course with the given id was not found');
   return;
 }     

 const index = courses.indexOf(course);
 course.splice(index, 1);

 res.send(course);
});



app.get('/api/courses/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if(!course) return res.status(404).send('the course with the given id was not found');
 res.send(course);
});
const port = process.env.port || 3000;
app.listen(port, () => console.log('Listenning on port ...'));
