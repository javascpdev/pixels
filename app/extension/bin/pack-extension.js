const fs = require('fs');
const path = require('path');
const util = require('util');
const replace = require('replace-in-file');
const ChromeExtension = require('crx');
const xmlFilepath = path.resolve(
  __dirname,
  '../../pixels.chrisesplin.com/public/extension/update.xml',
);
const crxFilepath = path.resolve(
  __dirname,
  '../../pixels.chrisesplin.com/public/extension/pixels.crx',
);
const packageJson = require('../../package.json');

const crx = new ChromeExtension({
  codebase: 'https://pixels.chrisesplin.com/extension/pixels.crx',
  privateKey: fs.readFileSync(path.resolve(__dirname, './extension.pem')),
});

(async () => {
  await crx.load(path.resolve(__dirname, '../build'));

  const crxBuffer = await crx.pack();
  const updateXML = await crx.generateUpdateXML();

  fs.writeFileSync(xmlFilepath, updateXML);
  fs.writeFileSync(crxFilepath, crxBuffer);

  const changes = await replace({
    files: [xmlFilepath],
    from:
      "<updatecheck codebase='https://pixels.chrisesplin.com/extension/pixels.crx' version='1.0'",
    to: `<updatecheck codebase='https://pixels.chrisesplin.com/extension/pixels.crx' version='${packageJson.version}'`,
  });

  console.info({ changes });
})();
