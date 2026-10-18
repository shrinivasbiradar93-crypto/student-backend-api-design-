const cl = console.log;
let students = [
    {
        id: "1",
        firstName: "Srinivas",
        lastName: "Biradar",
        course: "Computer Science",
        email: "srinivas@gmail.com",
        contact: "9876543210"
    },
    {
        id: "2",
        firstName: "Rahul",
        lastName: "Patil",
        course: "Information Technology",
        email: "rahul@gmail.com",
        contact: "9876543211"
    },
    {
        id: "3",
        firstName: "Priya",
        lastName: "Sharma",
        course: "Computer Applications",
        email: "priya@gmail.com",
        contact: "9876543212"
    },
    {
        id: "4",
        firstName: "Amit",
        lastName: "Deshmukh",
        course: "Computer Science",
        email: "amit@gmail.com",
        contact: "9876543213"
    },
    
    {
        id: "5",
        firstName: "Sneha",
        lastName: "Jadhav",
        course: "Information Technology",
        email: "sneha@gmail.com",
        contact: "9876543214"
    }
];


const express = require("express")
const app = express()
app.use(express.json())

app.get("/api/students", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            body: students,
            message: "student fetched successfully"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: err.message
        })
    }
})


app.get("/api/students/:id", (req, res) => {
    try {
        const id = req.params.id;

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            })
        }

        res.status(200).json({
            success: true,
            body: student,
            message: "Student fetched successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
})

//create
app.post("/api/students", (req, res) => {
    try {
        let newStd = {
            id: Date.now().toString(),
            firstName: req.body.fname,
            lastName: req.body.lname,
            course:req.body.course,
            email: req.body.email,
            contact: req.body.contact,
        }

        students.push(newStd)

        res.status(201).json({
            success: true,
            body: newStd,
            message: "Student created successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
})

//update
app.patch("/api/students/:id", (req, res) => {
    try {
        let student = students.find(s => s.id == req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            })
        }

        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.course = req.body.course;
        student.email = req.body.email;
        student.contact = req.body.contact;

        res.status(200).json({
            success: true,
            body: student,
            message: "Student updated successfully",
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
})

//delete
app.delete("/api/students/:id", (req, res) => {
    try {
        let getInd = students.findIndex(s => s.id == req.params.id);

        if (getInd === -1) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            })
        }

        let deleteStd = students.splice(getInd, 1);

        res.status(200).json({
            success: true,
            body: deleteStd[0],
            message: "Student deleted successfully",
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
})


app.listen(3000, () => {
    cl("Student data fetched successfully")
})
