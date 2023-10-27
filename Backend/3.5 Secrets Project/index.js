//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const correctPassword = "ILoveProgramming";
var password;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

app.use(bodyParser.urlencoded({extended: true}));

function passwordChecker(req, res, next) {
    console.log(req.body);
    password = req.body["password"];
    next();
  }

app.use(passwordChecker)

app.post("/check", (req, res) => {
    console.log(req.body);
    if(password === correctPassword){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.redirect("/");
        console.log("Incorrect Password.")
    }
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });