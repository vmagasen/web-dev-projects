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

//GET All book

app.get("/books", async (req, res) => {
  try{
    books = await getBooks();
  res.json(books);
  } catch (err){
    console.error("Error in /books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

//GET a specific book by id

app.get("/books/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const foundBooks = books.find((book) => book.id === id);
  res.json(foundBooks);
})

//POST a new book

app.post("/books", async (req, res) =>{
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    notes: req.body.notes,
    author: req.body.author,
    rating: req.body.rating,
    date_last_read: req.body.date_last_read
  };
  const { title, author, rating, date_last_read, notes } = newBook;
  try{
    await db.query(
  "INSERT INTO books_read (title, author, rating, date_last_read, notes) VALUES ($1, $2, $3, $4, $5)",
  [title, author, rating, date_last_read, notes]
); res.json(newBook);
  } catch(err) {
    console.error("Error in /books (post):", err);
    res.status(500).json({ error: "Failed to add book" });
  }
  
})

//UPDATE a book

app.patch("/books/:id", async (req, res) =>{
  const id = parseInt(req.params.id);
  const existingBook = books.find((book) => book.id === id);
  const replaceBook = {
    id: id,
    title: req.body.title || existingBook.title,
    notes: req.body.notes || existingBook.notes,
    author: req.body.author || existingBook.author,
    rating: req.body.rating || existingBook.rating,
    date_last_read: req.body.date_last_read || existingBook.date_last_read
  };
  let { title, author, rating, date_last_read, notes } = replaceBook;
  console.log("before parse: "+date_last_read);
  if (typeof date_last_read === "string" ){
      //const [day, month, year] = date_last_read.split('-');
      const dateObj = new Date(date_last_read);
      date_last_read = dateObj;
  }
  try{
    console.log("Parsed: " + date_last_read)
    await db.query(
  `UPDATE books_read 
  SET 
    title = $1,
    author = $2,
    rating = $3,
    date_last_read = $4,
    notes = $5
  WHERE 
    id = $6
  `,
  [title, author, rating, date_last_read, notes, id]
); 
  res.json(replaceBook);
  } catch(err) {
    console.error("Error in /books (patch):", err);
    res.status(500).json({ error: "Failed to update book" });
  }
})

//DELETE a specific book by providing the book id.

app.delete("/books/:id", async (req, res) => {
  const id =parseInt(req.params.id);
 try{
    await db.query("DELETE FROM books_read WHERE id = $1", [id])
    res.sendStatus(200);
  } catch {
    res
      .status(404)
      .json({error: `Book with id ${id} not found. No books deleted.`});
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
