VERSION=$(cat package.json | jq -r .version)

docker build --platform=linux/amd64 -t fritiof-dev ./
docker tag fritiof-dev "pumpedsardines/fritiof-dev:$VERSION"
docker tag fritiof-dev "pumpedsardines/fritiof-dev:latest"
docker push "pumpedsardines/fritiof-dev:$VERSION"
docker push "pumpedsardines/fritiof-dev:latest"
