'use strict'

const fs = require(`fs`);
const {ExitCode} = require(`../../constants`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const YEAR = 2021;

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

const generateDate = () => {
  const currentDate = new Date();
  const newDate = new Date(
    YEAR,
    currentDate.getMonth() + getRandomInt(MonthRestrict.MIN, MonthRestrict.MAX),
    currentDate.getDate() + getRandomInt(DayRestrict.MIN, DayRestrict.MAX),
    currentDate.getHours() + getRandomInt(HoursRestrict.MIN, HoursRestrict.MAX),
    currentDate.getMinutes() + getRandomInt(MinutesRestrict.MIN, MinutesRestrict.MAX),
    currentDate.getSeconds() + getRandomInt(SecondsRestrict.MIN, SecondsRestrict.MAX))

  const MM = newDate.getMonth() + 1 >= 10 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`;
  const DD = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
  const hh = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
  const mm = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
  const ss = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;

  return `${newDate.getFullYear()}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => {
    const announceAndfullText = shuffle(SENTENCES);

    return {
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      announce: announceAndfullText.slice(1, 5).join(` `),
      fullText: announceAndfullText.slice(5, announceAndfullText.length - 1).join(` `),
      createdDate: generateDate(),
      category: shuffle(CATEGORIES).slice(1, getRandomInt(2, CATEGORIES.length - 1)),
    }
  })
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;

    if (count > 1000) {
      console.error(`Не больше 1000 объявлений.`);
      process.exit(ExitCode.success);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      console.info(`Operation success. File created.`);
      process.exit(ExitCode.success);
    });
  }
};
