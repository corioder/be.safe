GOBIN=$(pwd)/functions go install ./...
cp ./api/data/countries.json ./functions/countries.json
npm run produce
