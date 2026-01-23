import i18next from 'i18next';

const i18nextInstance = i18next.createInstance();

i18nextInstance.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        errors: {
          invalidUrl: 'Ссылка должна быть валидным URL',
          emptyUrl: 'Не должно быть пустым',
          invalidRss: 'Ресурс не содержит валидный RSS',
          duplicateRss: 'RSS уже существует',
          networkError: 'Ошибка сети',
        },
        success: {
          valid: 'RSS успешно загружен',
        }
      },
    },
  },
});

export default i18nextInstance;