cd notes-final/Authorization && docker build -t authorization . && docker run --name authorization-container -p 8100:80 authorization

--------------------------------------------------------------------------------------------------------------------------------------

docker stop $(docker container ls -a -q) && docker rm $(docker container ls -a -q) && docker rmi $(docker image ls -a -q)