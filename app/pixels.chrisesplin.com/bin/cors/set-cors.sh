# gcloud auth login
gcloud auth activate-service-account --key-file=/app/pixels.chrisesplin.com/functions/google-service-account.json
gsutil cors set /app/pixels.chrisesplin.com/bin/cors/cors.json gs://quiver-pixels-2020-temp