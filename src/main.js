import './style.css';
import 'bootstrap';
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
    activePostId: '',
    seenPostsId: [],
  },
};

// из вебинара: реакция вотчера на стейт синхронная!
const watchedState = onChange(state, (path) => {
  render(watchedState, path);
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

// const updateData = (url, state) => {

// }

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

const postsContainer = document.querySelector('.posts');

postsContainer.addEventListener('click', (e) => {
  const button = e.target.closest('button[data-bs-toggle="modal"]');
  const link = e.target.closest('a[data-id]');
  if (button) {
    const id = button.dataset.id;
    watchedState.ui.activePostId = id;
    watchedState.ui.seenPostsId.push(id);

    return;
  }
  if (link) {
    const id = link.dataset.id;
    watchedState.ui.seenPostsId.push(id);

  }
  return;
});

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
        watchedState.feeds.unshift({ id, url, ...parsedData.feed });
        const dataWithId = parsedData.posts.map((post) => {
          post.id = nanoid(10);
          post.feedId = id;
          return { ...post, id: nanoid(10), feedId: id };
        });
        watchedState.posts.unshift(...dataWithId);
        watchedState.loading.status = 'idle';
      });
    })
    .catch((error) => {
      if (error === 'invalidUrl' || error === 'duplicateRss') {
        watchedState.form.error = error;
        watchedState.form.isValid = false;
        watchedState.loading.status = 'idle';
        watchedState.loading.error = null;
        return;
      }
      watchedState.loading.status = 'failed';
      watchedState.loading.error = getError(error);
      watchedState.form.error = null;
    });
});
