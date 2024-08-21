import express from "express";
import bodyParser from "body-parser"


const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// array of the existent blog posts
const blogPosts = [ 
  {
    title: "Muffins",
    recipe: "basjgdx jaa cgas asdcv vhas sd fdsdd",
  },
  {
    title: "noodles",
    recipe: "bsacjasd acd dhsc aad chjas djadsa ",
  },
  {
    title: "pizza",
    recipe: "bcahsjcjzxbcjas c vhgs chs dc c zvzc hvhz",
  }
]


//array of middleware to use
const middleware = {
saveRecipe:  function saveRecipe(req, res, next) {
  blogPosts.push({
   title: req.body.title,
   recipe: req.body.recipe,
  })
   next();
 },
deleteRecipe: function deleteRecipe(req, res, next) {
  const [index] = Object.keys(req.body);
  blogPosts.splice(index, 1);
  next();
},
saveEdit:  function saveEdit(req, res, next) {
  const index = req.body.index;
  blogPosts.splice(index, 1, req.body)
   next();
 },
}

 


//renders the home page
app.get("/", (req, res) => {
  res.render("index.ejs", 
    {blogPosts}
  )
})

//renders page containing the creating post form
app.get("/createPost", (req, res) => {
  res.render("newPost.ejs")
})


//posts the new post
app.post("/createPost", middleware.saveRecipe, (req, res) => {
  res.redirect("/")
})


//delets post
app.post("/delete", middleware.deleteRecipe, (req, res) =>{
  res.redirect("/");
})

//gets the index of the element to be edited and opens the editing form
app.post("/edit", (req, res) => {
  const [index] = Object.keys(req.body);
res.render("editPost.ejs", {posts: blogPosts,
  index: index,
})}
)

//replaces the original post with the edited version
app.post("/saveEdit", middleware.saveEdit , (req,  res) => { 

  res.redirect("/")})



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
