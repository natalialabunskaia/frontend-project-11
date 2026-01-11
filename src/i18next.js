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
          duplicateRss: 'RSS уже существует',
        },
        success: {
          valid: 'RSS успешно загружен',
        },
      },
    },
  },
});

export default i18nextInstance;