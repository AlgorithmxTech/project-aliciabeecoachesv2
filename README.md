# AJ web - Next.js Docker Deployment 

This guide helps build and run this Next js web app using docker compose 

## 1. clone the repo
```bash
git clone <REPO>
```

## 2. install dependencies 

```bash
npm install
```
also you need to add  .env files and check the if the project build successfully 

```bash
npm run build
```

## 3.  build the docker image 
```bash
docker compose build
```
## 4. Run the app
```bash
docker compose up -d
```