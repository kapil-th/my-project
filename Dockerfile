FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npx", "http-server", "src", "-p", "8080", "-c-1"]
