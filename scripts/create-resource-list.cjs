const fs = require('fs');
const path = require('path');
const tokens = require('../data/tokens.json');
const chains  = require('../data/chains.json');

const STATIC_PATH = 'https://resources.acala.network';

function writeFile(data, dist) {
  fs.writeFileSync(dist, JSON.stringify(data, undefined, 2));
}

function createDistPath (name) {
  return path.join(__dirname, '../public', name);
}

function mapStaticPath(data) {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => {
      return [k, `${STATIC_PATH}${v.icon}`]
    })
  )
}

function main () {
  writeFile(
    mapStaticPath(tokens),
    createDistPath('tokens.json')
  )
  writeFile(
    mapStaticPath(chains),
    createDistPath('chains.json')
  )
}

main();