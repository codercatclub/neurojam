export NODE_ENV=production
yarn build
yarn export
pushd out/
touch .nojekyll
git init
git remote add origin https://github.com/Kif11/neurojam-build.git
git add .
git commit -m "Automatic deploy"
git push -f -u origin master
popd