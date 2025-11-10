# Use official Maven image to build the app
FROM maven:3.9.9-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Package the application (skip tests)
RUN ./mvnw clean package -DskipTests

# Use lightweight JRE for running
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
