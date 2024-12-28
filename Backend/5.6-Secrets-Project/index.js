
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


app.use(express.static("public"));


app.get("/", async (req, res) => {
    try{
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        const result = response.data;
        res.render("index.ejs", {
            secret: result.secret,
            user: result.username
        });
      } catch (error){
        res.status(404).send(error.response.data);
      }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });