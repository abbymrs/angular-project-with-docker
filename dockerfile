FROM node:13.1.0-alpine as builder
COPY package.json package-lock.json ./
RUN npm set progress=true && npm config set depth 0 && npm cache clean --force
RUN npm i && mkdir /multimedia-admin && cp -R ./node_modules ./multimedia-admin
WORKDIR /multimedia-admin
COPY . .
RUN $(npm bin)/ng build --prod


FROM nginx:1.16.1-alpine
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /multimedia-admin/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]