# Use Maven image for building
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy everything
COPY . .

# Build using system Maven (not wrapper)
RUN mvn clean package -DskipTests

# Use JRE for running
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy built JAR
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
