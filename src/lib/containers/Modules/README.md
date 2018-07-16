# MODULES

Modules are custom predefined elements which the user can, in the CMS, use to build custom pages by placing them into rows and columns and setting props (such as title, skin etc).

In this directory you can find all the front end module logic, from the building of the rows and columns (ModuleBuilder.js) to the layout and style of each module.

## The Process

Although each file has its' own more in depth documentation, we'll give an overview of the flow here.

1.  A custom page response includes 'module_data', which consists of 'content' and 'rows'.

The 'content' is simply a string of html which defines the grid. Using span tags with various attributes and classes, we can contain everything we need about the structure of the grid.

The 'rows' object contains the data for each module (type of module, user defined props etc). It has a nested structure, with each row containing an array of columns and each column containing an array of modules. Since each row has an id which is given both in the grid html and in the 'rows' object, we can easily match each module to its' position in the grid. The grid markup and the row data are built at the same time in the same loop, so the number of rows/columns/modules should always match.

2.  This data is passed to the ModuleBuilder. The ModuleBuilder renders the grid from the 'content' string. Then, looping through the modules in the 'rows' data, it passes the module data through the ModuleFactory and renders the resulting module component into its' respective position in the grid via a React Portal.

Please see the ModuleFactory and ModuleBuilder files for more detail on the process.

3.  Each row runs an iterative function that ensures all modules have the same height as the highest one in the row.

## Notes on Module Component Structure

Although we render the modules with the above process, it isn't the only way. If you want to reuse any of the module components anywhere in the app, they should work out the box given the correct props. Just make sure the contain the module in a div and pass a reference to that container node to the module as a prop.

Modules all extend the parent BCorpModule component which automatically gives them access to a number of class variables such as container size, skin etc. Just make sure, if using a lifecycle method, that you call the parent lifecycle method first.
