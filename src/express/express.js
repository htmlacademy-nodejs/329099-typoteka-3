'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const loginRouter = require(`./routes/login`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const registerRouter = require(`./routes/register`);
const searchRouter = require(`./routes/search`);
const categoriesRouter = require(`./routes/categories`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/`, mainRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);
app.use(`/categories`, categoriesRouter);

app.listen(DEFAULT_PORT, () => console.info(chalk.green(`Сервер запущен на порту: ${DEFAULT_PORT}`)));
