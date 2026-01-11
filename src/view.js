import i18nextInstance from './i18next.js'

const render = (path, value) => {
  const input = document.getElementById('url-input');
  const feedback = document.querySelector('.feedback');
  if (path === 'form.error' && value === 'InvalidUrl') {
    feedback.textContent = i18nextInstance.t('errors.invalidUrl');
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }
  if (path === 'form.error' && value === 'duplicateRss') {
    feedback.textContent = i18nextInstance.t('errors.duplicateRss');
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }
  if (path === 'form.status' && value === 'valid') {
    feedback.textContent = i18nextInstance.t('success.valid');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove('is-invalid');
    input.value = '';
    input.focus();
  }
};
export default render;
