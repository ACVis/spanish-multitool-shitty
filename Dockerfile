# Use an official MongoDB image as the base
FROM mongo

# Set environment variables
ENV MONGO_INITDB_DATABASE flashcards

# Copy database initialization script
COPY init-db.js /docker-entrypoint-initdb.d/

# Expose MongoDB port
EXPOSE 27017
