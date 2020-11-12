git init
heroku git:remote besafego
git add .
git commit -m "deploy"
git push heroku master -f
rm -rf .git
