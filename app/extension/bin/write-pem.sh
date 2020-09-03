echo "test: $ALGOLIA_PREFIX"
echo "PEM incoming: $EXTENSION_PEM_BASE64"
echo $EXTENSION_PEM_BASE64 | base64 -d > /app/extension/bin/extension.pem || true