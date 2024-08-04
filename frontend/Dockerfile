FROM node:18.13.0-alpine

WORKDIR /app/front
ENV PATH /app/front/node_modules/.bin:$PATH

# COPY package.json .
COPY package*.json ./
COPY yarn.lock ./
# RUN yarn --no-lockfile
# RUN yarn --frozen-lockfile
RUN yarn
# RUN npm install yup

COPY . .

EXPOSE 3000

# CMD ["npm", "start"]
