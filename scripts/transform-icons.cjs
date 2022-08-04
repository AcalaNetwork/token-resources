const path = require('path')
const fs = require("fs");
const svg2png = require("svg2png");

const getAllImages = () => {
  const networks = fs.readdirSync(path.join(__dirname, '../resources/networks'));
  const tokens = fs.readdirSync(path.join(__dirname, '../resources/tokens'));

  return [
    ...networks.map(name => ({ dir: 'networks', name })),
    ...tokens.map(name => ({ dir: 'tokens', name }))
  ];
}

const transform = async (sourceBuffer, size, name, dir) => {
  return svg2png(sourceBuffer, {height: size, width: size})
    .then(buffer => fs.writeFileSync(`./public/${dir}/${name}.png`, buffer))
    .catch(e => console.error(e));
}

const transformAll = async () => {
  const promises = [];
  const images = getAllImages();

  fs.mkdirSync('./public/networks', { recursive: true })
  fs.mkdirSync('./public/tokens', { recursive: true })

  images.forEach(({ dir, name })=> {
    const sourceBuffer = fs.readFileSync(`./resources/${dir}/${name}`);

    // skip all hidden file
    if (name.startsWith('.')) return;

    if (name.endsWith('svg')) {
      promises.push(() => {
        return transform(sourceBuffer, 128, name.split('.')[0], dir)
      })
    } else if (name) {
      promises.push(() => {
        return fs.writeFileSync(`./public/${dir}/${name.split('.')[0]}.png`, sourceBuffer);
      })
    }
  })

  await Promise.all(promises.map(i => i()));

  console.log('completed');
}

transformAll();
