# Spring-Boot-and-ReactJS
Basic CRUD application, using ReactJS and JQuery as a User Interface.

# To run the project, simply go to target folder, and type "java -jar react-0.0.1-SNAPSHOT.jar"

To generate a new version, use "mvn clean install" at the root folder.

It is a basic CRUD application, using Spring Boot server. The userinterface is located in the resource/ folder. It is a simple and clear Single Page Application, as it is using ReactJS to generate clear a visualisation of the data, which you can fully modify or delete.

Each server restart will erase any change made on the H2 In-Memory Database, as it is a sample DB to show how the application works. 

Connecting it to a real DB is pretty straight forward, and the code is also easily editable, as the code contains a bunch of comments.
