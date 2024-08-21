import express from "express";
import bodyParser from "body-parser"
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const blogPosts = [ 
  {
    title: "Muffins",
    recipe: "basjgdx jaa cgas asdcv vhas sd fdsdd",
    id: uuidv4(),
  },
  {
    title: "noodles",
    recipe: "bsacjasd acd dhsc aad chjas djadsa ",
    id: uuidv4(),
  },
  {
    title: "pizza",
    recipe: "bcahsjcjzxbcjas c vhgs chs dc c zvzc hvhz",
    id: uuidv4(),
  }
]

const middleware = {
saveRecipe:  function saveRecipe(req, res, next) {
  blogPosts.push({
   title: req.body.title,
   recipe: req.body.recipe,
   id: uuidv4(),
  })
   next();
 },
deleteRecipe: function deleteRecipe(req, res, next) {
  const [index] = Object.keys(req.body);
  blogPosts.splice(index, 1);
  next();
}
}

 



app.get("/", (req, res) => {
  res.render("index.ejs", 
    {blogPosts}
  )
})

app.get("/createPost", (req, res) => {
  res.render("newPost.ejs")
})

app.post("/createPost", middleware.saveRecipe, (req, res) => {
  res.redirect("/")
})

app.post("/delete", middleware.deleteRecipe, (req, res) =>{
  res.redirect("/");
})





app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
