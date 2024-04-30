FROM node:latest

WORKDIR /app/frontend


COPY frontend/package.json .
COPY frontend/package-lock.json .


RUN npm install --legacy-peer-deps


COPY . .


EXPOSE 5173


CMD ["npm", "run", "dev"]
