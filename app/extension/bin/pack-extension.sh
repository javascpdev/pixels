echo "test: $ALGOLIA_PREFIX"
echo "PEM incoming: $EXTENSION_PEM_BASE64"
echo $EXTENSION_PEM_BASE64 | base64 -d > /app/extension/bin/extension.pem || true

mkdir /app/pixels.chrisesplin.com/public/extension || true

node /app/extension/bin/pack-extension.js
zip -r /app/pixels.chrisesplin.com/public/extension/pixels.zip /app/extension/build

cp -r /app/pixels.chrisesplin.com/public/extension /app/pixels.chrisesplin.com/out || true
