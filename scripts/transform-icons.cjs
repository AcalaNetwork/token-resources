const path = require('path')
const fs = require("fs");
const svg2png = require("svg2png");

const getAllSvgs = () => {
  const networks = fs.readdirSync(path.join(__dirname, '../resources/networks'));
  const tokens = fs.readdirSync(path.join(__dirname, '../resources/tokens'));

  return [...networks.map(name => { return { dir: 'networks', name } }), ...tokens.map(name => { return { dir: 'tokens', name } })];
}

const transform = async (sourceBuffer, size, name, dir) => {
  return svg2png(sourceBuffer, {width: size, height: size})
    .then(buffer => fs.writeFileSync(`./public/${dir}/${name}.png`, buffer))
    .catch(e => console.error(e));
}

const transformAll = async () => {
  const promises = [];
  const svgs = getAllSvgs();

  fs.mkdirSync('./public/networks', { recursive: true })
  fs.mkdirSync('./public/tokens', { recursive: true })

  svgs.forEach(svg => {
    const { dir, name } = svg;
    const sourceBuffer = fs.readFileSync(`./resources/${dir}/${name}`);

    if (name.endsWith('svg')) {
      promises.push(transform(sourceBuffer, 128, name.split('.')[0], dir))
    }

    fs.writeFileSync(`./public/${dir}/${name.split('.')[0]}.png`, sourceBuffer)
  })

  await Promise.all(promises);

  console.log('ok');
}

transformAll();