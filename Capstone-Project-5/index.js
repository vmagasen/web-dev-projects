import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const quote_API_URL = "http://api.forismatic.com/api/1.0/";
const image_API_URL = "https://picsum.photos/500/600?blur=2";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try{
      res.render("index.ejs", {
      });
    } catch (error){
      res.status(404).send(error.response.data);
    }
});

app.post("/submit", async (req, res) => {
  try {
    const quoteResult = await axios.get(quote_API_URL, {
      params:{
        method:"getQuote",
        format: "json",
        lang: "en"
      }
    });
    //const imgResult = await axios.get(image_API_URL);
    console.log(quoteResult);
    res.render("index.ejs", {quote: quoteResult.data});
  } catch (error) {
    res.render("index.ejs",{quote: JSON.stringify(error.response)});
    console.log(error);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});