import bodyParser from "body-parser";
import express from "express";

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mimic the db using array
let blogList = [];

// Get all blogs
app.get('/blogs', (req, res) => {
    return res.status(200).json({
        data: blogList,
        success: true
    });
});

// creating new blogs
app.post('/blogs', (req, res) => {
    console.log(req.body)
    blogList.push({
        title: req.body.title, 
        content: req.body.content,
        id: Math.floor(Math.random() * 1000)
    })
    return res.status(201).json({
        success: true
    });
});

// Getting one particular blog
app.get("/blogs/:id", (req, res) => {
    // console.log(req.params);
    const result = blogList.filter(blog => blog.id == req.params.id);
    return res.status(200).json({
        data: result,
        success: true
    });
});

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}...`);
});