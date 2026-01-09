import './style.css';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';

const state = {
  form: {
    value: '',
    status: 'filling',
    // filling — пользователь печатает, ошибки не показываем
    // invalid — submit, yup или дубликат, есть form.error
    // valid — форма прошла yup, можно начинать загрузку
    // submitted — успешная отправка формы
    error: null,
  },
  loading: {
    status: 'idle',
    // idle — загрузка не идёт
    // loading — идёт запрос, кнопка disabled
    // success — RSS успешно загружен
    // error — ошибка загрузки
    error: null,
  },
  feeds: [],
};

const watchedState = onChange(state, (path, value) => {
  console.log('state:', state);
  render(path, value);
});

const schema = yup.string().required().url();

const checkDuplicates = (url, feeds) => {
  if (feeds.includes(url)) {
    return Promise.reject('duplicateRss');
  }
  return Promise.resolve(url);
};

const validate = (url) => {
  return schema
    .validate(url)
    .then(() => url)
    .catch(() => Promise.reject('InvalidUrl'));
};

const form = document.querySelector('.rss-form.text-body');
const input = document.getElementById('url-input');

input.addEventListener('input', (e) => {
  watchedState.form.value = e.target.value;
  watchedState.form.status = 'filling';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validate(watchedState.form.value)
    .then((url) => checkDuplicates(url, watchedState.feeds))
    .then((url) => {
      watchedState.feeds.push(url);
      watchedState.form.status = 'valid';
      watchedState.form.error = null;
    })
    .catch((error) => {
      watchedState.form.error = error;
      watchedState.form.status = 'invalid';
    });
});
