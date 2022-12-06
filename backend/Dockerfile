FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY . ./

RUN npm ci
RUN npx prisma generate
# RUN npx prisma migrate dev --name init   << ต้องทำหลังจาก db run ใน docker-compose

EXPOSE 3000
# CMD [ "npm", "start" ]     << ถ้าสั่งรันเลย จะใช้คำสั่งอื่นไม่ได้แล้ว ใน docker-compose