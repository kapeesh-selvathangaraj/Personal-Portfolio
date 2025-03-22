# Use official Node image
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source code and build
COPY . .
RUN yarn build

# Use nginx for serving static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
