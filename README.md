# spanish-multitool-shitty

## Docker

```bash
docker run -d -p 27017:27017 --name my-shitty-multitool-mongo-container -v "$(pwd)/database:/data/db" shitty-multitool-mongo
```

This command starts the MongoDB container, binds the host's port 27017 to the container's port 27017, and assigns the container the name "flashcards-mongo-container".  

Now, you have a Docker container running MongoDB with the flashcards database. Your Next.js app can connect to this containerized MongoDB instance by specifying the appropriate connection URL (e.g., mongodb://localhost:27017/flashcards) in your application code.  

In the docker run command you provided, flashcards-mongo refers to the Docker image that is used to create the MongoDB container. It is the image name that you tagged when building the Docker image using the docker build command.

In the example command you shared:

```bash
docker run -d -p 27017:27017 --name my-flashcards-mongo-container -v "$(pwd)/database:/data/db" flashcards-mongo
```
The image name flashcards-mongo is specified at the end of the command. It represents the Docker image that contains the MongoDB installation and configuration.

When you built the Docker image using the docker build command, you assigned the tag flashcards-mongo to the image using the -t flag. For example:

bash
Copy code
```bash
docker build -t flashcards-mongo .
```
In this case, **flashcards-mongo** is the tag name you provided for the Docker image.

The docker run command uses this image to create and start a new container based on that image. The container will have the specified name (my-flashcards-mongo-container in this case), and the other options define how the container should run, such as port mapping and volume mounting.

Remember to replace flashcards-mongo with the correct image name you used when building the MongoDB image for your specific project.  

## How to use Mongo in Docker

To run a terminal session inside a Docker container, you can use the docker exec command. Here's how you can do it:

First, ensure that your Docker container is running. You can check the status of your container by running the following command:


```bash
docker ps
```
This command lists the running Docker containers. Make sure your MongoDB container is listed and running.

Once you have verified that the container is running, you can open a terminal session inside the container using the docker exec command. Run the following command, replacing your-container-name with the actual name or ID of your MongoDB container:

```bash
docker exec -it your-container-name bash
```
The -it flag allows you to interact with the terminal session inside the container, and bash specifies the shell to use.

After executing the command, you will be inside the container's terminal session, and you can run commands as if you were directly working in the container.

For example, you can run the mongo command to start the MongoDB shell and interact with the MongoDB database:

```bash 
mongosh
```
You can now use the MongoDB shell commands to interact with the MongoDB database running in the container.

Remember to replace your-container-name with the actual name or ID of your MongoDB container. If you're unsure about the container name or ID, you can check it using the docker ps command.

Running a terminal session inside a Docker container allows you to execute commands and interact with the containerized environment, which can be useful for troubleshooting, running specific commands, or exploring the containerized system.

To view the contents of a database named "test" using the MongoDB command line, you can follow these steps:

List the databases. Confirm that `test` is there.
```
show dbs
```

From inside the MongoDB shell, switch to the "test" database by running the following command:


```
use test
```
After switching to the "test" database, you can view the collections within the database by executing the show collections command:


```
show collections
```
This command will list all the collections present in the "test" database.

To view the documents within a specific collection, you can use the find() method. For example, if you have a collection named "cards," you can view its documents by running the following command:


```lua
db.cards.find()
```
This command will display all the documents in the "cards" collection. Alternatively, you can prettify it. Like so: `db.cards.find().pretty()`

By following these steps, you can see the contents of the "test" database and its collections using the MongoDB command line interface.

The `test` database is for dev and flashcards is maybe for production? Either way, right now it's using `test`.