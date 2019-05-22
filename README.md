@ To build and push images:

cd Authorization && docker build -t authorization . && docker tag authorization krushilgoud/authorization && docker push krushilgoud/authorization

cd Users && docker build -t users . && docker tag users krushilgoud/users && docker push krushilgoud/users

cd Notes && docker build -t notes . && docker tag notes krushilgoud/notes && docker push krushilgoud/notes

cd UI && docker build -t ui . && docker tag ui krushilgoud/ui && docker push krushilgoud/ui

---------------------------------------------------------------------------------------------------------------

@ To build and run images:

docker run --name mongo-users-container -p 27017:27017 -e MONGODB_USERNAME=admin -e MONGODB_PASSWORD=admin -e MONGODB_DATABASE=UsersDB bitnami/mongodb

docker run --name mongo-notes-container -p 27018:27017 -e MONGODB_USERNAME=admin -e MONGODB_PASSWORD=admin -e MONGODB_DATABASE=NotesDB bitnami/mongodb

cd notes-final/Authorization && docker build -t authorization . && docker run --name authorization-container -p 8100:80 authorization

cd notes-final/Users && docker build -t users . && docker run --name users-container -p 8200:80 users

cd notes-final/Notes && docker build -t notes . && docker run --name notes-container -p 8300:80 notes

---------------------------------------------------------------------------------------------------------------

@ To stop and remove all running containers and built images:

docker stop $(docker container ls -a -q) && docker rm $(docker container ls -a -q) && docker rmi $(docker image ls -a -q)

---------------------------------------------------------------------------------------------------------------

Docker commands for notes-final

————————————————————————————————————————————————————

docker stop usemongo-users-container && docker rm mongo-users-container && docker rmi mongo-users

docker stop usemongo-notes-container && docker rm mongo-notes-container && docker rmi mongo-notes

docker stop authorization-container && docker rm authorization-container && docker rmi authorization

docker stop users-container && docker rm users-container && docker rmi users

docker stop notes-container && docker rm notes-container && docker rmi notes

————————————————————————————————————————————————————



docker run --name mongo-users-container -p 27017:27017 -e MONGODB_USERNAME=admin -e MONGODB_PASSWORD=admin -e MONGODB_DATABASE=UsersDB bitnami/mongodb



docker run --name mongo-notes-container -p 27018:27017 -e MONGODB_USERNAME=admin -e MONGODB_PASSWORD=admin -e MONGODB_DATABASE=NotesDB bitnami/mongodb



cd notes-final/Authorization && docker build -t authorization . && docker run --name authorization-container -p 8100:80 authorization


cd notes-final/Users && docker build -t users . && docker run --name users-container -p 8200:80 users



cd notes-final/Notes && docker build -t notes . && docker run --name notes-container -p 8300:80 notes



docker stop $(docker container ls -a -q) && docker rm $(docker container ls -a -q) && docker rmi $(docker image ls -a -q)

————————————————————————————————————————————————————
