const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) =>{
    res.render("index");    
});

app.post("/contact", async(req, res) => {
    try {
        // res.send(req.body);
        const userdata = new User(req.body);
        await userdata.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
});