const express = require('express');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Temporary course storage
let courses = [
    {
        id: 101,
        coursename: "fsd",
        coursecode: "fsd202",
        department: "cse"
    }
];

// GET - Display all courses
app.get('/courses', (req, res) => {
    res.status(200).json(courses);
});

// GET - Display a particular course
app.get('/courses/:id', (req, res) => {
    const course = courses.find(
        c => c.id === Number(req.params.id)
    );

    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    res.json(course);
});

// POST - Add a new course
app.post('/courses', (req, res) => {
    const { id, coursename, coursecode, department } = req.body;

    if (!id || !coursename || !coursecode || !department) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (courses.some(c => c.id === Number(id))) {
        return res.status(409).json({
            message: "Course ID already exists"
        });
    }

    const newCourse = {
        id: Number(id),
        coursename,
        coursecode,
        department
    };

    courses.push(newCourse);

    res.status(201).json({
        message: "Course added successfully",
        course: newCourse
    });
});

// PUT - Update a course
app.put('/courses/:id', (req, res) => {
    const course = courses.find(
        c => c.id === Number(req.params.id)
    );

    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    const { coursename, coursecode, department } = req.body;

    if (!coursename || !coursecode || !department) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    course.coursename = coursename;
    course.coursecode = coursecode;
    course.department = department;

    res.json({
        message: "Course updated successfully",
        course
    });
});

// DELETE - Remove a course
app.delete('/courses/:id', (req, res) => {
    const index = courses.findIndex(
        c => c.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    courses.splice(index, 1);

    res.json({
        message: "Course deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
