## TEMPLATES

# The Templates define our allowed page layouts. By accepting certain data and callable render functions as props, the templates allow a user to fill predefined spaces with custom content and set certain meta properties.

Any component that renders a 'page' in the old sense of the word, perhaps better defined here as any component which is attached directly to its' own route, should compose one of these templates in its' render function.

This is how we ensure that only our allowed pre-approved page templates are used, and that if we ever need to modify any layouts we only need to worry about doing it in one place.

# Base and Derived Templates

We can divide our templates into two categories, base and derived templates.

Base templates only define the core page layouts and their most basic functionality, meaning they are completely un-opinionated about what type of page they can be used for. A good example is the RightSidebarTemplate, which defines only the size of the sidebar and custom content area, allowing you to render anything you like in both.

Derived templates all compose one or many base templates. They mostly still define areas for you to render custom content (some just allow a custom title), but are more opinionated about what the page will be used for. A good example is the Careers Template, which composes but a FullWidthTemplate and a LeftSidebarTemplate, has a lot of content already in place (the CTA module and Slider), but still has space for adding custom content.

# Template Data From the CMS

Although we've been careful to build the templates in such a way that they can be called from anywhere in the site, probably the main use case is from via a custom page defined in the CMS.

The flow is like so:

1.  When creating a page in the CMS, the user creates their content in the WYSIWYG, resulting in WYSIWYG and BCorp Page Builder generated HTML and shortcodes. They also select a page template from a dropdown and fill in any relevant metaboxes.

2.  When this page is requested from the front end (by the Customizable page component) we receive in the response a page data object (which, among other things, includes the slug of the selected template, page ID and title, and data from any metaboxes relevant to the selected template), widget data, and module data.

3.  The customizable page component builds the widget and module nodes from the data in the response (see Pages/Customizable for more detail), and passes them as callable render functions, along with the page data, to the TemplateFactory.

4.  Using the template slug passed as props, the TemplateFactory then directs the relevant page data and render functions to the correct template.

5.  With all its' props having been passed through by the Factory, the relevant template is then rendered.
