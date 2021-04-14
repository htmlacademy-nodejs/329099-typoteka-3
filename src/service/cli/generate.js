'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const FILE_NAME = `mocks.json`;
const DATA_DIR = `data`;
const CATEGORIES_FILE = `categories.txt`;
const SENTENCES_FILE = `sentences.txt`;
const TITLES_FILE = `titles.txt`;
const YEAR = 2021;

const Count = {
  DEFAULT: 1,
  MAX: 1000,
};
const MonthRestrict = {
  MIN: 0,
  MAX: 3,
};
const DayRestrict = {
  MIN: 0,
  MAX: 25,
};
const HoursRestrict = {
  MIN: 0,
  MAX: 23,
};
const MinutesRestrict = {
  MIN: 0,
  MAX: 60,
};
const SecondsRestrict = {
  MIN: 0,
  MAX: 60,
};

const getData = async (fileName) => {
  try {
    const filePath = path.join(process.cwd(), DATA_DIR, fileName);
    const file = await fs.readFile(filePath);
    return file.toString().split(`\n`).slice(0, -1);
  } catch (error) {
    return console.error(`Can't open file...\n${error}`);
  }
};

const generateDate = () => {
  const currentDate = new Date();
  const newDate = new Date(
      YEAR,
      currentDate.getMonth() + getRandomInt(MonthRestrict.MIN, MonthRestrict.MAX),
      currentDate.getDate() + getRandomInt(DayRestrict.MIN, DayRestrict.MAX),
      currentDate.getHours() + getRandomInt(HoursRestrict.MIN, HoursRestrict.MAX),
      currentDate.getMinutes() + getRandomInt(MinutesRestrict.MIN, MinutesRestrict.MAX),
      currentDate.getSeconds() + getRandomInt(SecondsRestrict.MIN, SecondsRestrict.MAX));

  const MM = newDate.getMonth() + 1 >= 10 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`;
  const DD = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
  const hh = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
  const mm = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
  const ss = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;

  return `${newDate.getFullYear()}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};

const generateOffers = async (count) => {
  const categories = await getData(CATEGORIES_FILE);
  const sentences = await getData(SENTENCES_FILE);
  const titles = await getData(TITLES_FILE);

  return Array(count).fill({}).map(() => {
    const announceAndFullText = shuffle(sentences);

    return {
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: announceAndFullText.slice(1, 5).join(` `),
      fullText: announceAndFullText.slice(5, announceAndFullText.length - 1).join(` `),
      createdDate: generateDate(),
      category: shuffle(categories).slice(1, getRandomInt(2, categories.length - 1)),
    };
  });
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;

    if (count > Count.MAX) {
      console.error(chalk.red(`Не больше ${Count.MAX} объявлений.`));
      process.exit(ExitCode.SUCCESS);
    }

    const countOffer = Number.parseInt(count, 10) || Count.DEFAULT;
    const content = JSON.stringify(await generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...\n${error}`));
      process.exit(ExitCode.ERROR);
    }
  }
};
