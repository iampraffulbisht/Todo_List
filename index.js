import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import * as date from './date.js';
const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "PermaList",
  password: "******",
  port: 5435,
});
db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Press + to Add new Item "},
  { id: 2, title: "To edit item press ✎" },
  { id: 3, title: "To delete item press checkbox" },
];


app.get("/", async (req, res) => {
  try{
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows;
    const currentDate = date.getDate(); // Using the imported function
    
    res.render("index.ejs", {
      listTitle: currentDate,
      listItems: items,
    });

  }
  catch(err){
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try{
    await db.query("INSERT INTO items (title) VALUES ($1)",[item]);
    res.redirect("/");
  }
  catch(err){
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async(req, res) => {
  const deleteId = req.body.deleteItemId;
  try{
    
    await db.query("DELETE FROM items WHERE id = $1",[deleteId]);
    res.redirect("/");
  }
  catch(err){
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
