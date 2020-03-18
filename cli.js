#!/usr/bin/env node
// ********************************************
// Notes: This is little command tool to creating template component folders that include storybook files and enzyme tests
// https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
// Testing Locally: npm link
// Unmount and clean up: npm unlink
// ********************************************

const fs = require('fs');
const replace = require('replace-in-file');
// Grab the args
const [, , ...args] = process.argv;

const rootDir = process.cwd();
const validNameRegex = /^[^\\/?%*:|"<>\.]+$/;

const replacePlaceholders = async (path, componentName, placeholder) => {
    const options = {
        //Multiple files
        files: [
            `${path}/${componentName}.js`,
            `${path}/${componentName}.story.js`,
            `${path}/${componentName}.test.js`,
        ],

        //Replacement to make (string or regex)
        from: new RegExp(placeholder, 'g'),
        to: componentName,
    };

    await replace(options)
        .catch(error => {
            console.error('Error occurred:', error);
        });
};

const copyFile = (filePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        fs.copyFile(filePath, destinationPath, (err) => {
            if (err) {
                console.error(err);
                reject(err)
            } else {
                console.log(`${destinationPath} created successfully`);
                resolve();
            }
        });
    })
};

const copyTemplates = async (path, componentName, args) => {
    const componentPath = `${path}/${componentName}.js`;
    const storyPath = `${path}/${componentName}.story.js`;
    const testPath = `${path}/${componentName}.test.js`;

    const statelessComponentTemplatePath = `${__dirname}/templates/Component-stateless.js`;
    const storyTemplatePath = `${__dirname}/templates/Component.story.js`;
    const testTemplatePath = `${__dirname}/templates/Component.test.js`;

    await copyFile(statelessComponentTemplatePath, componentPath).catch(err => reject(err));
    await copyFile(storyTemplatePath, storyPath).catch(err => reject(err));
    await copyFile(testTemplatePath, testPath).catch(err => reject(err));
};

const run = async (folderPath, storyPath, componentNames) => {
    // Loop through args/component names
    console.log('run');
    for (let componentName of componentNames) {
        console.log(componentName);
        if (validNameRegex.test(componentName)) {
            // We don't want to overwrite any folders and/or files that already exist
            componentName = componentName.charAt(0).toUpperCase() + componentName.substring(1);
            const path = `${folderPath}/${componentName}`;

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
                // copy the files from the templates, this can take a second so we need to wait
                await copyTemplates(path, componentName);
                console.log('copied');
                await replacePlaceholders(path, componentName, '[$]componentName[$]');
                await replacePlaceholders(path, componentName, '[$]storyPath[$]');

            } else {
                console.error(`${path} already exists, skipping creation of this component`)
            }
        }
    }
};


const yargs = require('yargs')
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .option('path', {
        alias: 'p',
        type: 'string',
        description: 'Relative path to the directory for components'
    })
    .option('class', {
        alias: 'c',
        type: 'boolean',
        description: 'Create a class component instead of functional component'
    })
    .option('story', {
        alias: 's',
        type: 'string',
        description: 'The path of the stories in storybook'
    });

const argv = yargs.argv;

if (argv._.length === 0) {
    // No component names should throw an error
    console.error('ERROR: no component names supplied as arguments. \n' +
        'There supply component name: Component1 Component2');
    return;
} else if (!argv.story) {
    console.warn('WARNING: No story path (-s, or --story) provided, stories will be created under root path')
}

let folderPath = rootDir;
let storyPath = argv.story ? argv.story : '';
if (argv.path) {
    if (argv.path[0] != '/'){
        argv.path = '/' + argv.path;
    }
    folderPath += argv.path;
}

run(folderPath, storyPath, argv._, argv.verbose).then(r => console.log('complete'));
