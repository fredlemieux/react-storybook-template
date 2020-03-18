#!/usr/bin/env node
/*
require('yargs') // eslint-disable-line
    .command('serve [port]', 'start the server', (yargs) => {
        yargs
            .positional('port', {
                describe: 'port to bind on',
                default: 5000
            })
    }, (argv) => {
        if (argv.verbose) console.info(`start server on :${argv.port}`);
        console.log('you have been serveed!!!');
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .argv;
*/

const yargs = require('yargs')
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .option('ships', {
        alias:'s',
        type: 'number',
        description: 'The number of ships'
    });

const argv = yargs.argv;
if (argv.ships > 3 && argv.distance < 53.5) {
    console.log('Plunder more riffiwobbles!');
    console.log('remainder', argv._)
} else {
    console.log('Retreat from the xupptumblers!')
}
