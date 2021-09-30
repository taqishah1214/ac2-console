FROM node:13 as Builder
LABEL MAINTAINER fahad.shehzad@codedistrict.com

ARG HQ_API_URL
ARG IGNORE_API_PREFIX
ENV HQ_API_URL $HQ_API_URL
ENV IGNORE_API_PREFIX $IGNORE_API_PREFIX

WORKDIR /app/


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN echo "HQ_API_URL = $HQ_API_URL\n" >> dist/api_url.log
######################################################################
FROM nginx:alpine

COPY ./docker-setup/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /app/dist /usr/share/nginx/html/
COPY --from=Builder /app/build_info.md /usr/share/nginx/html/build_info.txt

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

