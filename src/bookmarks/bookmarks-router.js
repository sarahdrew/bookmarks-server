const express = require("express");

const logger = require("../logger");
const BookarksService = require("./bookmarks-service");

const bookmarksRouter = express.Router();
const bodyParser = express.json();

const serializeBookmark = bookmark => ({
  id: bookmark.id,
  title: bookmark.title,
  url: bookmark.url,
  description: bookmark.description,
  rating: Number(bookmark.rating)
});

bookmarksRouter
  .route("/bookmarks")
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res, next) => {
    for (const field of ["title", "url", "rating"]) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send(`'${field}' is required`);
      }
    }

    const { title, url, description, rating } = req.body;

    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`);
      return res.status(400).send(`'rating' must be a number between 0 and 5`);
    }

    if (!isWebUri(url)) {
      logger.error(`Invalid url '${url}' supplied`);
      return res.status(400).send(`'url' must be a valid URL`);
    }

    const newBookmark = { title, url, description, rating };
  });

bookmarksRouter
  .route("/bookmarks/:bookmark_id")
  .get((req, res) => {
    const { id } = req.params;
    const list = lists.find(li => li.id == id);

    // make sure we found a list
    if (!list) {
      logger.error(`List with id ${id} not found.`);
      return res.status(404).send("List Not Found");
    }

    res.json(list);
  })
  .delete((req, res) => {
    const { bookmark_id } = req.params;
    const listIndex = lists.findIndex(li => li.id == bookmark_id);

    if (listIndex === -1) {
      logger.error(`List with id ${bookmark_id} not found.`);
      return res.status(404).send("Not Found");
    }

    lists.splice(listIndex, 1);

    logger.info(`List with id ${bookmark_id} deleted.`);
    res.status(204).end();
  });

module.exports = bookmarksRouter;
