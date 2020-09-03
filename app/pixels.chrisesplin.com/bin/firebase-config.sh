#! bin/sh
echo "Exporting firebase functions config..."
export PATH="$(yarn global bin):$PATH"

firebase functions:config:set \
  algolia.admin_api_key=$ALGOLIA_PRIVATE_API_KEY \
  algolia.prefix=$ALGOLIA_PREFIX \
  imgur.client_id=$IMGUR_CLIENT_ID \
  imgur.client_secret=$IMGUR_CLIENT_SECRET \
  google.bucket_temp=$GOOGLE_BUCKET_TEMP \
   --token $FIREBASE_TOKEN --project=$FIREBASE_PROJECT