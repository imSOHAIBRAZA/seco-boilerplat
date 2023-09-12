FROM node:12-stretch as builder

WORKDIR /app
RUN echo "1==== $(date '+%d/%m/%Y %H:%M:%S')"
ADD . .
RUN apt-get -qq update
RUN echo "2==== $(date '+%d/%m/%Y %H:%M:%S')"
RUN apt-get -qq install netbase build-essential autoconf libffi-dev
RUN echo "3==== $(date '+%d/%m/%Y %H:%M:%S')"
RUN npm install
RUN echo "4==== $(date '+%d/%m/%Y %H:%M:%S')"
RUN npm run build:development
RUN echo "5==== $(date '+%d/%m/%Y %H:%M:%S')"

FROM nginx:1.13
COPY --from=builder /app/build/ /usr/share/nginx/html/
ADD default.conf /etc/nginx/conf.d/
