const express = require("express");
const postsRouter = require("./posts/posts-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send(`<h1>This is My Second Backend Project</h1>`)
})


server.use("/api/posts", postsRouter)


const PORT = 2222
server.listen(PORT, () => {
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})