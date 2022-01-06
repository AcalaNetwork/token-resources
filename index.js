const fs = require("fs");
const svg2png = require("svg2png");

const getAllSvgs = () => {
  const networks = fs.readdirSync('./resources/network');
  const tokens = fs.readdirSync('./resources/tokens');

  return [...networks.map(name => { return { dir: 'network', name } }), ...tokens.map(name => { return { dir: 'tokens', name } })];
}

const transform = async (sourceBuffer, size, name, dir) => {
  return svg2png(sourceBuffer, {width: size, height: size})
    .then(buffer => {
      fs.writeFileSync(`./dist/${dir}/${name}_${size}_${size}.png`, buffer);
    })
    .catch(e => console.error(e));
}

const transformAll = async () => {
  const promises = [];
  const svgs = getAllSvgs();

  fs.mkdirSync('./dist/network', { recursive: true })
  fs.mkdirSync('./dist/tokens', { recursive: true })

  svgs.forEach(svg => {
    const { dir, name } = svg;
    const sourceBuffer = fs.readFileSync(`./resources/${dir}/${name}`);
    if (name.endsWith('svg')) {
      promises.push(transform(sourceBuffer, 128, name.split('.')[0], dir))
      promises.push(transform(sourceBuffer, 256, name.split('.')[0], dir))
    } else {
      if (name.startsWith('khala_')) {
        fs.writeFileSync(`./dist/${dir}/${name.split('.')[0]}.png`, sourceBuffer)
      } else {
        fs.writeFileSync(`./dist/${dir}/${name.split('.')[0]}_${128}_${128}.png`, sourceBuffer)
        fs.writeFileSync(`./dist/${dir}/${name.split('.')[0]}_${256}_${256}.png`, sourceBuffer)
      }
    }
  })

  const res = await Promise.all(promises);

  console.log('ok');
}

transformAll();