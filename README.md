# React Storybook
> React component template directory generator for storybook

## Introduction:

This is a tool for creating component template directories which include associated storybook, 
and test files.  This tool is very handy when using a [component driven design](https://blog.hichroma.com/component-driven-development-ce1109d56c8e)
approach to developing the UI. 

## Installation
At the moment this is just installed by:
1) Cloning this repository. 
1) In the project directory run the command `npm link` to install/link the tool to your local npm
1) You can then test the installation by running the command `rsb --help`

To uninstall in the project directory run the command `npm unlink`
 
## Example Use:
When provided with UI designs, before starting to code, take the time to think about how the page can be split in to 
seperate, and if possible, reusable components and what their names would be. 

For example if you had a simple webpage, that displays a filtered grid of cards 
with content; perhaps you could split it into the following components:
- Header
- SideBar
- ContentCard
- FilterOptions

and so on, you get the point...

Rather than have to create a 
- component directory for each, write template react boilerplate,
- then a .story file that links to your react component and renders it in storybook
- and a test file with a basic test

and repeat for all components, at which is all repetative, just do the command

`rsb -p <to/some/directory> -s <storybook/path> Header SideBar ContentCard` and so on...

This will create component directory in the specified path (-p flag), with storybook file with
the already nested in the specified storybook path (-s flag), and test file with a basic test.

## Todo:
- Create flag to allow create class component instead of functional component
- Decide on a name... rebook?
- Upload to npm? TBC

Acknowledgements: Very special thanks [Rubens Mariuzzo](https://medium.com/@rmariuzzo) for this 
[artcle]( https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)
on creating command line tools.
