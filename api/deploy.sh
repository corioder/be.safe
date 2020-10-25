git init
heroku git:remote besafego
git add .
git commit -m "dep"
git push heroku master -f
rm -rf .git
