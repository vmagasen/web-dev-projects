import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "009070",
  port: 5432
});

db.connect();

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];

  result.rows.forEach((country) => {
    countries.push(country.country_code)

  });
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisisted();
  res.render("index.ejs", {countries:countries, total: countries.length})
});

app.post("/add", async (req, res) => {
  let newCountry = req.body["country"];
  try {
    let newCountryCode = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",[newCountry]);
    if (newCountryCode.rows.length !== 0) {
      const data = result.rows[0];
      const countryCode = data.country_code;
      try{
        db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",[countryCode]);
        res.redirect("/");
      } catch (err){
          console.log(err);
          const countries = await checkVisisted();
          res.render("index.ejs",{
            countries: countries,
            total: countries.length,
            error: "Country has already been added, try again."
          });
        }
    }
  }catch (err){
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs",{
        countries: countries,
        total: countries.length,
        error: "Country does not exist, try again."
      });
    } 
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
