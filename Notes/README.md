docker run --name mongo-notes-container -p 27018:27017 -e MONGODB_USERNAME=admin -e MONGODB_PASSWORD=admin -e MONGODB_DATABASE=NotesDB bitnami/mongodb

cd notes-final/Notes && docker build -t notes . && docker run --name notes-container -p 8300:80 notes

--------------------------------------------------------------------------------------------------------------------------------------

docker stop $(docker container ls -a -q) && docker rm $(docker container ls -a -q) && docker rmi $(docker image ls -a -q)