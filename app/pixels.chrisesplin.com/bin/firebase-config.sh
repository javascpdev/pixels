#! bin/sh
echo "Exporting firebase functions config..."

npx firebase functions:config:set \
  imgur.client_id=$IMGUR_CLIENT_ID \
  imgur.client_secret=$IMGUR_CLIENT_SECRET \
  google.bucket_temp=$GOOGLE_BUCKET_TEMP \
   --token $FIREBASE_TOKEN --project=$FIREBASE_PROJECT