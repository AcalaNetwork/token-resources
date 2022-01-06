const qiniu = require('qiniu');
const fs = require('fs');
const { accessKey, secretKey } = require('./config');
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: 'polkawallet',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

let now = 0;
let all = 0;

const getAllPngs = () => {
  const networks = fs.readdirSync('./dest/network');
  const tokens = fs.readdirSync('./dest/tokens');

  return [...networks.map(name => { return { dir: 'network', name } }), ...tokens.map(name => { return { dir: 'tokens', name } })];
}

var config = new qiniu.conf.Config({
  zone: qiniu.zone.Zone_z2
});
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();

const upload = async (dir, name) => {
  var localFile = `./dest/${dir}/${name}`;
  var key = `${dir}/${name}`;
  // 文件上传
  return new Promise((res, rej) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        rej(respErr);
      }
      console.log(`[${dir}/${name}] done!, ${now++}/${all}`)
      if (respInfo.statusCode == 200) {
        res(respBody)
      } else {
        res(respBody)
      }
    });
  })
}

const uploadAll = async () => {
  const pngs = getAllPngs();
  all = pngs.length;
  const promises = [];

  pngs.forEach(item => {
    promises.push(upload(item.dir, item.name))
  })

  await Promise.all(promises);

  console.log('all done!')
}

uploadAll();