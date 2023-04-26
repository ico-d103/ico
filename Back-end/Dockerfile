
# open jdk java11 버전 환경
FROM openjdk:11-jdk

WORKDIR /app

COPY api-module/build/libs/ico-api-module-0.0.1.jar api-module.jar

COPY batch-module/build/libs/ico-batch-module-0.0.1.jar batch-module.jar

CMD ["java", "-jar", "api-module.jar"]

CMD ["java", "-jar", "batch-module.jar"]
