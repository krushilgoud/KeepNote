docker run --name mongo-users-container -p 27017:27017 -e MONGODB_USERNAME=admin -e MONGODB_PASSWORD=admin -e MONGODB_DATABASE=UsersDB bitnami/mongodb

cd notes-final/Users && docker build -t users . && docker run --name users-container -p 8200:80 users

docker stop $(docker container ls -a -q) && docker rm $(docker container ls -a -q) && docker rmi $(docker image ls -a -q)