import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "009070",
  port: 5432
});
db.connect();
// In-memory data store
let books = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    notes:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    rating: 5,
    date_last_read: "2023-08-01T",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    notes:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    rating: 5,
    date_last_read: "2023-08-05",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    notes:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    rating: 5,
    date_last_read: "2023-08-10",
  },
];

let lastId = 3;

async function getBooks() {
  const result = await db.query("SELECT * FROM books_read ORDER BY id ASC;");
  let resultBooks = result.rows;
  console.log(resultBooks);
  return resultBooks;
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET All posts

app.get("/posts", async (req, res) => {
  try{
    books = await getBooks();
  /*res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  }); */
  res.json(books);
  } catch (err){
    console.error("Error in /posts:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});
/*
app.get("/posts", (req, res) =>{
  res.json(books);
}) */

//GET a specific post by id

app.get("/posts/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const foundPost = books.find((book) => book.id === id);
  res.json(foundPost);
})

//POST a new post

app.post("/posts", (req, res) =>{
  const newPost = {
    id: books.length + 1,
    title: req.body.title,
    notes: req.body.notes,
    author: req.body.author,
    rating: req.body.rating,
    date_last_read: req.body.date_last_read
  };
  posts.push(newPost);
  console.log(posts.slice(-1));
  res.json(newPost);
})

//UPDATE a post

app.patch("/posts/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const existingPost = posts.find((book) => book.id === id);
  const replacePost = {
    id: id,
    title: req.body.title || existingPost.title,
    notes: req.body.notes || existingPost.notes,
    author: req.body.author || existingPost.author,
    rating: req.body.rating || existingPost.rating,
    date_last_read: req.body.date_last_read || existingPost.date_last_read
  };
  const searchIndex = books.findIndex((book) => book.id === id);
  books[searchIndex] = replacePost;
  console.log(books[searchIndex]);
  res.json(replacePost);
})

//DELETE a specific post by providing the post id.

app.delete("/posts/:id", (req, res) => {
  const id =parseInt(req.params.id);
  const searchIndex = books.findIndex((book) => book.id == id);
  if (searchIndex > -1){
    books.splice(searchIndex, 1);
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({error: `Post with id ${id} not found. No post deleted.`});
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
