# IMAGINESHOP

Setup database

Install docker and docker compose


```sh
docker-compose up -d
```
Import the prismas migrations 

```sh
npx prisma migrate dev
```

To view the database use a DBMS or use the following command

```sh
npx prisma studio
```