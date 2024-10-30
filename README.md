# RentItOut Project
![rent](https://github.com/user-attachments/assets/a4cf5aa0-5f4b-4fb0-ac49-c8269d96b5df)

## Prerequisites:
* Git & Github
* MySQL Database
* NPM
* Docker
* Node
* Logging
* JWT Authentication & Authorization
* API Testing & Documentation with Postman
* Nodemon for hot reloaded

## Steps
### Via CMD

1- Cloning project from github to your local machine
```
git clone https://github.com/khaledsaadehh/RentItOut.git
```
2- Go inside project folder
```
cd RentItOut
```

3- Build & Run Docker Containers( Nodejs & MySQL Server )
```
docker-compose up -d --build
```

---

### Additional Commands for Docker

1- Turn off all Docker Containers
```
docker-compose down
```

2- Display all Docker Containers
```
docker ps
```

3- To view our containers logs 
```
docker logs rentitproject-app-1 -f
docker logs rentitproject-mysqldb-1  -f

```

4- To enter inside Containers shell
```
docker exec -it rentitproject-app-1 bash
docker exec -it rentitproject-mysqldb-1 bash

```

---

### Additional Commands for Treat with MySQL inside NodeJS app Container
1- Enter to nodejs app container
```
docker exec -it rentitproject-app-1 bash
```

2- Connect to our database
```
mysql -h mysqldb -P 3306 -u root -p
```

3- Then Enter DB Password
```
rentitout
```

4- Now you inside DB 
```
USE rentitout;
```

5- Display all DB tables
```
SHOW tables;
```

Now, you can make all database operations as you want.



## Wiki Pages
- [Home](https://github.com/khaledsaadehh/RentItOut/wiki): Home page
- [API Documentation](https://github.com/khaledsaadehh/RentItOut/wiki/API-Documentation): Explore the API endpoints and usage documentation.
- [Installation](https://github.com/khaledsaadehh/RentItOut/wiki/Installation-Guide): Get started with setting up the RentItOut API on your local machine.
- [Developer Guide](https://github.com/khaledsaadehh/RentItOut/wiki/Developer-Guide): Learn about the Repo and how to contribute to the RentItOut API project.
- [Tools and Technologies Used](https://github.com/khaledsaadehh/RentItOut/wiki/Tools-and-Technologies): Explore the tools and technologies used in the development of the RentItOut API.


# Authors

- [Khaled Saadeh](https://github.com/khaledsaadehh)
- [Osama Sholi](https://github.com/osamasholi)


Copyright © 2024 RentItOut. All rights reserved.
