const parseRss = (xml) => {
  const parser = new DOMParser()
  const data = parser.parseFromString(xml, 'text/xml')
  const hasParserError = data.querySelector('parsererror')
  const hasRss = data.querySelector('rss')
  const hasChannel = data.querySelector('channel')
  if (hasParserError || !hasRss || !hasChannel) {
    throw new Error('invalidRss')
  }
  const feedElTitle = data.querySelector('channel > title')
  const feedTitle = feedElTitle.textContent

  const feedElDescription = data.querySelector('channel > description')
  const feedDescription = feedElDescription.textContent

  const postEls = data.querySelectorAll('item')
  const posts = Array.from(postEls).map((el) => {
    const titleEl = el.querySelector('title')
    const postTitle = titleEl.textContent

    const linkEl = el.querySelector('link')
    const postLink = linkEl.textContent

    const descriptionEl = el.querySelector('description')
    const postDescription = descriptionEl.textContent

    return {
      title: postTitle,
      link: postLink,
      description: postDescription,
    }
  })

  return {
    feed: {
      title: feedTitle,
      description: feedDescription,
    },
    posts: posts,
  }
}

export default parseRss
