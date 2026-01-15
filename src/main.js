import './style.css';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';
import parseRss from './parser.js';
import axios from 'axios';
import { nanoid } from 'nanoid';

// model
const state = {
  form: {
    value: '',
    isValid: false, // true/false
    error: null,
  },
  loading: {
    status: 'idle',
    // idle — загрузка не идёт
    // loading — идёт запрос, кнопка disabled
    // success — RSS успешно загружен
    // failed — ошибка загрузки: Ошибка сети\ ошибка парсера\неизвестная ошибка

    error: null,
  },
  feeds: [], // [{ id, url, title, description }]
  posts: [], //[{ id, feedId, title, link, description }]
  ui: {
    seenPosts: [], // список просмотренных постов объект\массив?
  },
};

// из вебинара: реакция вотчера на стейт синхронная!
const watchedState = onChange(state, () => {
  render(state);
});

const schema = yup.string().required().url();

const checkDuplicates = (url, feeds) => {
  if (feeds.some((element) => element.url === url)) {
    return Promise.reject('duplicateRss');
  }
  return Promise.resolve(url);
};

const validate = (url) => {
  return schema
    .validate(url)
    .then(() => url)
    .catch(() => Promise.reject('invalidUrl'));
};

const loadData = (url) => {
  return axios
    .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
    .then((response) => parseRss(response.data.contents));
};

const getError = (error) => {
  if (error.message === 'invalidRss') {
    return 'invalidRss';
  }
  if (error.code === 'ERR_NETWORK') {
    return 'networkError';
  }
  return 'unknownError';
};

const form = document.querySelector('.rss-form.text-body');
const input = document.getElementById('url-input');

// controller
input.addEventListener('input', (e) => {
  watchedState.form.value = e.target.value;
  watchedState.form.isValid = false;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validate(watchedState.form.value)
    .then((url) => checkDuplicates(url, watchedState.feeds))
    .then((url) => {
      watchedState.form.isValid = true;
      watchedState.loading.status = 'loading'; // чекнуть блокируется ли кнопка
      watchedState.form.error = null;
      return loadData(url).then((parsedData) => {
        watchedState.loading.status = 'success';
        const id = nanoid(10);
        watchedState.feeds.push({ id, url, ...parsedData.feed });
        const dataWithId = parsedData.posts.map((post) => {
          post.id = nanoid(10);
          post.feedId = id;
          return { ...post, id: nanoid(10), feedId: id };
        });
        watchedState.posts.push(...dataWithId);
        watchedState.loading.status = 'idle';
        console.log('state:', state);
      });
    })
    .catch((error) => {
      if (error === 'invalidUrl' || error === 'duplicateRss') {
        watchedState.form.error = error;
        watchedState.form.isValid = false;
        watchedState.loading.status = 'idle';
        watchedState.loading.error = null;
        console.log('FORM ERROR STATE:', watchedState.form);
        console.log('LOADING STATE:', watchedState.loading);
        return;
      }
      watchedState.loading.status = 'failed';
      watchedState.loading.error = getError(error);
      watchedState.form.error = null;
      console.log('LOADING STATE:', watchedState.loading);
    });
});


