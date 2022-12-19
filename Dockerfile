FROM node:18.12.1-alpine3.16
RUN npm install -g ultra-pkg
WORKDIR /app
COPY . .
RUN ultra install
RUN ultra run build
EXPOSE 3000
CMD ["ultra", "run", "start-prod"]