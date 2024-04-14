# Node.js 이미지를 기반으로하여 작성
FROM node:16-alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# .env 파일 복사
COPY .env ./

# 애플리케이션 종속성 설치
COPY package*.json ./
RUN npm install --production
RUN npm i @rollup/rollup-linux-x64-gnu

# 애플리케이션 소스코드 복사
COPY . .

# 환경 변수로 .env 파일 내용 전달
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Vue.js 애플리케이션 빌드
RUN npm run build

# Nginx를 사용하여 정적 파일을 호스팅하는 이미지 생성
FROM nginx:stable-alpine as production-stage
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]