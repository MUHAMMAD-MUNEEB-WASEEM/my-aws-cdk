// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // Only update the `/app` page.
  if (page.path.match(/^\/api-store/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/api-store/*"

    // Update the page.
    createPage(page)
  } else if (page.path.match(/^\/api-under-dev/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/api-under-dev/*"
    // Update the page.
    createPage(page)
  } else if (page.path.match(/^\/api-published/)) {
    page.matchPath = "/api-published/*"
    // Update the page.
    createPage(page)
  } else if (page.path.match(/^\/api-subscribed/)) {
    page.matchPath = "/api-subscribed/*"
    // Update the page.
    createPage(page)
  }
}
