import i18nextInstance from './i18next.js';

const renderErrors = (state) => {
  const input = document.getElementById('url-input');
  const feedback = document.querySelector('.feedback');
  if (state.form.error === 'invalidUrl') {
    feedback.textContent = i18nextInstance.t('errors.invalidUrl');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
  }
  if (state.form.error === 'duplicateRss') {
    feedback.textContent = i18nextInstance.t('errors.duplicateRss');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
  }
  if (state.loading.error === 'networkError') {
    feedback.textContent = i18nextInstance.t('errors.networkError');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
  }

  if (state.loading.error === 'invalidRss') {
    feedback.textContent = i18nextInstance.t('errors.invalidRss');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
  }

  if (state.loading.status === 'success') {
    feedback.textContent = i18nextInstance.t('success.valid');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove('is-invalid');
    input.value = '';
    input.focus();
  }
};

const renderFeeds = (feeds) => {

  const feedsContainer = document.querySelector('.feeds'); 
  feedsContainer.innerHTML = '';
  if (feeds.length === 0) {
    return
  }

  const feedsCard = document.createElement('div'); 
  feedsCard.classList.add('card', 'border-0');
  feedsContainer.appendChild(feedsCard); 

  const feedsCardBody = document.createElement('div'); 
  feedsCardBody.classList.add('card-body');
  const feedsTitle = document.createElement('h2');
  feedsTitle.classList.add('card-title', 'h4');
  feedsTitle.textContent = 'Фиды';
  feedsCard.appendChild(feedsCardBody); 
  feedsCardBody.appendChild(feedsTitle);

  const feedsList = document.createElement('ul'); 
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  feedsCard.appendChild(feedsList); 


  feeds.forEach((feed) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0');
    feedsList.appendChild(liEl);

    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = feed.title;
    liEl.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;
    liEl.appendChild(description);
  });

};

 const renderPosts = (posts) => {
  const postsContainer = document.querySelector('.posts'); 
  postsContainer.innerHTML = '';
  if (posts.length === 0) {
    return
  }

const postsCard = document.createElement('div'); 
  postsCard.classList.add('card', 'border-0');
  postsContainer.appendChild(postsCard); 

  const postsCardBody = document.createElement('div'); 
  postsCardBody.classList.add('card-body');
  const postsTitle = document.createElement('h2');
  postsTitle.classList.add('card-title', 'h4');
  postsTitle.textContent = 'Посты';
  postsCard.appendChild(postsCardBody); 
  postsCardBody.appendChild(postsTitle);

  const postsList = document.createElement('ul'); 
  postsList.classList.add('list-group', 'border-0', 'rounded-0');
  postsCard.appendChild(postsList); 

  posts.forEach((post) => {
    const liEl = document.createElement('li')
    liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
    const aEl = document.createElement('a')
    aEl.setAttribute('href', post.link)
    aEl.setAttribute('data-id', post.id)
    aEl.setAttribute('target', '_blank')
    aEl.setAttribute('rel', 'noopener noreferrer')
    aEl.textContent = post.title
    aEl.classList.add('fw-bold')
    liEl.appendChild(aEl)

    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    button.setAttribute('data-id', post.id)
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-bs-target', '#modal')
    button.textContent = 'Просмотр'
    liEl.appendChild(button)

    postsList.appendChild(liEl)
  })
  
  
}

const render = (state) => {
  renderErrors(state);
  renderFeeds(state.feeds);
  renderPosts(state.posts)
};

export default render;
