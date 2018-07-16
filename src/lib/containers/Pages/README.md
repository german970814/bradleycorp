# PAGES

'Pages' are components which are designed to be passed directly to the router.

In general, a page should accept props passed by the router, such as a match, and use them to render some content into a template to create the page.

These page components are here because they can be shared between the different apps. Each app also has its own Pages directory for pages specific to that app.

Really, the only important thing to note is that all pages should compose a template to make sure certain styles are consistent across all pages.
