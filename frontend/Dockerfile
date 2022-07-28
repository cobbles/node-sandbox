// Build Dev
FROM node:16.13.0-alpine AS development

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]

FROM nginx:1.23.1-alpine as production
COPY --from=development /app/dist /usr/share/nginx/html
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]