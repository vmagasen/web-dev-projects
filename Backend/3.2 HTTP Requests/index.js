import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1><p>My name is Vincent</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Me</h1><p>Phone: +63123456789</p>");
});

app.get("/services", (req,res) =>{
  res.send("<h1>Services</h1><p>Web Development </br> NetSuite Administration</p>")
});

app.listen(port, ()=>{
  console.log(`Server started at port ${port}`);
})
