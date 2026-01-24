import i18nextInstance from './i18next.js'

const renderErrors = (state) => {
  const input = document.getElementById('url-input')
  const feedback = document.querySelector('.feedback')
  if (state.form.error === 'invalidUrl') {
    feedback.textContent = i18nextInstance.t('errors.invalidUrl')
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger')
    input.classList.add('is-invalid')
  }
  if (state.form.error === 'duplicateRss') {
    feedback.textContent = i18nextInstance.t('errors.duplicateRss')
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger')
    input.classList.add('is-invalid')
  }
  if (state.form.error === 'emptyUrl') {
    feedback.textContent = i18nextInstance.t('errors.emptyUrl')
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger')
    input.classList.add('is-invalid')
  }
  if (state.loading.error === 'networkError') {
    feedback.textContent = i18nextInstance.t('errors.networkError')
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger')
    input.classList.add('is-invalid')
  }

  if (state.loading.error === 'invalidRss') {
    feedback.textContent = i18nextInstance.t('errors.invalidRss')
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger')
    input.classList.add('is-invalid')
  }

  if (state.loading.status === 'success') {
    feedback.textContent = i18nextInstance.t('success.valid')
    feedback.classList.remove('text-danger')
    feedback.classList.add('text-success')
    input.classList.remove('is-invalid')
    input.value = ''
    input.focus()
  }
}

const renderFeeds = (feeds) => {
  const feedsContainer = document.querySelector('.feeds')
  feedsContainer.innerHTML = ''
  if (feeds.length === 0) {
    return
  }

  const feedsCard = document.createElement('div')
  feedsCard.classList.add('card', 'border-0')
  feedsContainer.appendChild(feedsCard)

  const feedsCardBody = document.createElement('div')
  feedsCardBody.classList.add('card-body')
  const feedsTitle = document.createElement('h2')
  feedsTitle.classList.add('card-title', 'h4')
  feedsTitle.textContent = 'Фиды'
  feedsCard.appendChild(feedsCardBody)
  feedsCardBody.appendChild(feedsTitle)

  const feedsList = document.createElement('ul')
  feedsList.classList.add('list-group', 'border-0', 'rounded-0')
  feedsCard.appendChild(feedsList)

  feeds.forEach((feed) => {
    const liEl = document.createElement('li')
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0')
    feedsList.appendChild(liEl)

    const title = document.createElement('h3')
    title.classList.add('h6', 'm-0')
    title.textContent = feed.title
    liEl.appendChild(title)

    const description = document.createElement('p')
    description.classList.add('m-0', 'small', 'text-black-50')
    description.textContent = feed.description
    liEl.appendChild(description)
  })
}

const renderPosts = (posts, ui) => {
  const postsContainer = document.querySelector('.posts')
  postsContainer.innerHTML = ''
  if (posts.length === 0) {
    return
  }

  const postsCard = document.createElement('div')
  postsCard.classList.add('card', 'border-0')
  postsContainer.appendChild(postsCard)

  const postsCardBody = document.createElement('div')
  postsCardBody.classList.add('card-body')
  const postsTitle = document.createElement('h2')
  postsTitle.classList.add('card-title', 'h4')
  postsTitle.textContent = 'Посты'
  postsCard.appendChild(postsCardBody)
  postsCardBody.appendChild(postsTitle)

  const postsList = document.createElement('ul')
  postsList.classList.add('list-group', 'border-0', 'rounded-0')
  postsCard.appendChild(postsList)

  posts.forEach((post) => {
    const title = document.createElement('li')
    title.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    )
    const link = document.createElement('a')
    link.setAttribute('href', post.link)
    link.setAttribute('data-id', post.id)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer')
    link.textContent = post.title
    title.appendChild(link)
    if (ui.seenPostsId.includes(post.id)) {
      link.classList.add('fw-normal', 'link-secondary')
    } else {
      link.classList.add('fw-bold')
    }

    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    button.setAttribute('data-id', post.id)
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-bs-target', '#modal')
    button.textContent = 'Просмотр'
    title.appendChild(button)

    postsList.appendChild(title)
  })
}

const renderModalWindow = (ui, posts) => {
  const activePostId = ui.activePostId
  if (!ui.activePostId) return

  const post = posts.find((p) => p.id === activePostId)

  const modalTitle = document.querySelector('.modal-title')
  modalTitle.textContent = post.title

  const modalDescription = document.querySelector('.modal-body.text-break')
  modalDescription.textContent = post.description

  const modalButtonLink = document.querySelector(
    '.btn.btn-primary.full-article',
  )
  modalButtonLink.setAttribute('href', post.link)
}

const render = (state, path) => {
  renderErrors(state)
  if (path === 'feeds') renderFeeds(state.feeds)
  if (path === 'posts' || path.startsWith('ui.seenPostsId'))
    renderPosts(state.posts, state.ui)
  if (path === 'ui.activePostId') renderModalWindow(state.ui, state.posts)
}

export default render
