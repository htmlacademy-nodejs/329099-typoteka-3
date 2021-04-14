'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const path = require(`path`);
const loginRouter = require(`./routes/login`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const registerRouter = require(`./routes/register`);
const searchRouter = require(`./routes/search`);
const categoriesRouter = require(`./routes/categories`);

const PUBLIC_DIR = `public`;
const TEMPLATE_DIR = `templates`;
const DEFAULT_PORT = 8080;

const app = express();

app.set(`views`, path.resolve(__dirname, TEMPLATE_DIR));
app.set(`view engine`, `pug`);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);
app.use(`/categories`, categoriesRouter);

app.use((req, res, next) => res.render(`404`));
app.use((err, req, res, next) => res.render(`500`));

app.listen(DEFAULT_PORT, () => console.info(chalk.green(`Сервер запущен на порту: ${DEFAULT_PORT}`)));
