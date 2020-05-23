# Copy/paste the Bearer token from a valid web session

curl 'http://localhost:5001/quiver-pixels-2020/us-central1/imgurRefreshOAuth2' \
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1YzlhZWJlMjM0ZGE2MDE2YmQ3Yjk0OTE2OGI4Y2Q1YjRlYzllZWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2hyaXN0b3BoZXIgRXNwbGluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpS0ZJcHVPYlFpbTFIWmh0M2VFdldpd2VITHdsbU1jUGdud3NvN3hINCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9xdWl2ZXItcGl4ZWxzLTIwMjAiLCJhdWQiOiJxdWl2ZXItcGl4ZWxzLTIwMjAiLCJhdXRoX3RpbWUiOjE1ODk5NzY1NzksInVzZXJfaWQiOiJRdzlraUdVYllFZG5sNFdtMXR3OEhyWmtvZUYyIiwic3ViIjoiUXc5a2lHVWJZRWRubDRXbTF0dzhIclprb2VGMiIsImlhdCI6MTU5MDI0MzM0MCwiZXhwIjoxNTkwMjQ2OTQwLCJlbWFpbCI6ImNocmlzdG9waGVyLmVzcGxpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNzI3MzE4NjU4NzM5MjgxMzQ1NyJdLCJlbWFpbCI6WyJjaHJpc3RvcGhlci5lc3BsaW5AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Cl3mU3dvbUZu2NJ8WbRHkFnezz25Ngi6t6U6VL1L2gEE5rC9wZ_Q_HwuM6KfTwvXRclVwTCRfjxi_AEVnkKHbqjaKnBJRXkiyiZ4UEJTNo7yuKxIi7cx0gRrbuVjQInHlTy_riBx6aZCkrt7W9gC3Y1W-C2jL2N-VUTqTjHZxCeZ4OMAXPhXQzOwjNlDwgMV0Y8dAyQg9Km2WlUl2wFdHYF4ivF5B7CqYaruAKx5zXkDZpsGA0ue5wVOJDs1T7Z6N6kzY9pS9KX5Ky2Ld-egm0jp8kZSLef6ia-Q2bw5BG1rLJjqw0UJGILfAOQDVsaLObb8qYYfBdizFTVeTC6N3w' \
  -H 'content-type: application/json' \
  -H 'accept: */*' \
  -H 'origin: https://local.chrisesplin.com' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://local.chrisesplin.com/toolkit/imgur' \
  -H 'accept-language: en-US,en;q=0.9,mt;q=0.8' \
  --data-binary '{"data":null}' \
  --compressed