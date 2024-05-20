FROM openjdk:17
WORKDIR /app
COPY ../backend/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
EXPOSE 9191
