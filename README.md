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
## 3 copy the .env file 
```bash
cp .env.example .env
```
### ⚠ IMPORTANCE NOTICE 
> After copying, **you must open `.env` and fill all fields**

## 4 Build The Project
```bash
npm run build
```

## 5. Build Docker Image Only 
```bash
docker compose build
```

## 6. (optional)  Build And Deploy with Docker Compose
```bash
docker compose up -d
```

