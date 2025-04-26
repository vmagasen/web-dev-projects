import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "009070",
  port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function getItems() {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC;");
  let resultItems = result.rows;
  return resultItems;
}

app.get("/", async (req, res) => {
  try{
    items = await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
  } catch (err){
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(item);
  try {
    await db.query(
      "INSERT INTO items (title) VALUES ($1)",[item]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const updatedTitle = req.body.updatedItemTitle;
  const updatedID = req.body.updatedItemId;

  try {
    await db.query(
      "UPDATE items SET  title = ($1) WHERE id = $2",[updatedTitle, updatedID]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }

});

app.post("/delete", async (req, res) => {
  const deleteID = req.body.deleteItemId;
  try{
    await db.query(
      "DELETE FROM items WHERE id = $1", [deleteID]
    );
    res.redirect("/");
  } catch (err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
