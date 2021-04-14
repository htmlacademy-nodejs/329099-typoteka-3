'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/:id(\\d+)`, (req, res) => res.render(`post`));
articlesRouter.get(`/add`, (req, res) => res.render(`new-post`));
articlesRouter.get(`/category/:id(\\d+)`, (req, res) => res.render(`articles-by-category`));
articlesRouter.get(`/edit/:id(\\d+)`, (req, res) => res.render(`edit-post`));

module.exports = articlesRouter;
