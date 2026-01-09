const render = (path, value) => {
  const input = document.getElementById('url-input');
  const feedback = document.querySelector('.feedback');
  if (path === 'form.error' && value === 'InvalidUrl') {
    feedback.textContent = 'Ссылка должна быть валидным URL';
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }
  if (path === 'form.error' && value === 'duplicateRss') {
    feedback.textContent = 'RSS уже существует';
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }
  if (path === 'form.status' && value === 'valid') {
    feedback.textContent = 'RSS успешно загружен';
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove('is-invalid');
    input.value = '';
    input.focus();
  }
};
export default render;
