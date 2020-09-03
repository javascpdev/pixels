const fs = require('fs');
const path = require('path');
const ChromeExtension = require('crx');
const crx = new ChromeExtension({
  codebase: 'https://pixels.chrisesplin.com/extension/pixels.crx',
  privateKey: fs.readFileSync(path.resolve(__dirname, './extension.pem')),
});

(async () => {
  await crx.load(path.resolve(__dirname, '../build'));

  const crxBuffer = await crx.pack();
  const updateXML = await crx.generateUpdateXML();

  fs.writeFileSync(
    path.resolve(__dirname, '../../pixels.chrisesplin.com/public/extension/update.xml'),
    updateXML,
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../../pixels.chrisesplin.com/public/extension/pixels.crx'),
    crxBuffer,
  );
})();
