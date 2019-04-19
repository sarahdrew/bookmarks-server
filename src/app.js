require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const bookmarksService = require('./bookmarks-service');
const validateBearerToken = require("./validate-bearer-token");
const errorHandler = require("./error-handler");
const bookmarksRouter = require("./bookmarks/bookmarks-router");

const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test"
  })
);
app.use(cors());
app.use(helmet());
app.use(validateBearerToken);



//add router
app.use(bookmarksRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get('/bookmarks', (req, res, next) => {
  const knexInstance = req.app.get('db')
  bookmarksService.getAllBookmarks(knexInstance)
    .then(bookmarks => {
      if (!bookmarks) {
        return res.status(404).json({
          error: { message: `Bookmark doesn't exist` }
        })
      }
      res.json(bookmarks)
    })
    .catch(next)
})

app.get('/bookmarks/:bookmark_id', (req, res, next) => {
  const knexInstance = req.app.get('db')
  BookmarksService.getById(knexInstance, req.params.bookmark_id)
    .then(bookmark => {
      res.json(bookmark)
    })
    .catch(next)
})

//add error handler
app.use(errorHandler);

module.exports = app;
