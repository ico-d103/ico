FROM openjdk:11-jdk

WORKDIR /app

COPY api-module/build/libs/ico-api-module-0.0.1.jar /app/api-module.jar

CMD ["java", "-jar", "/app/api-module.jar"]