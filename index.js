const express = require("express");
const postsRouter = require("./routers/posts-router.js");
const commentsRouter = require("./routers/comments-router.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send(`<h1>This is My Second Backend Project</h1>`)
})


server.use("/api/posts", postsRouter)
server.use("/api/posts", commentsRouter)


const PORT = 2222
server.listen(PORT, () => {
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})