# Определите базовый образ
FROM node:18 AS build-stage

# Определите рабочую директорию
WORKDIR /app

# Скопируйте файлы проекта в образ
COPY . .

RUN npm install -g npm@10.2.0

# Установите зависимости
RUN npm ci

# Соберите проект
RUN npm run build

# Настройка продакшен-стадии
FROM nginx:1.19.0-alpine as production-stage

# Скопируйте статические файлы в Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Используйте конфигурацию nginx, если у вас есть кастомные настройки
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Объявите, что контейнер слушает порт 80
EXPOSE 80

# Запустите Nginx
CMD ["nginx", "-g", "daemon off;"]
