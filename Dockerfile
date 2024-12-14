FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 4000

ENV PM2_PUBLIC_KEY txepqo9xcpuv8iy

ENV PM2_SECRET_KEY v0xpx759e6rfa0m

CMD ["npm", "run", "dev"]
