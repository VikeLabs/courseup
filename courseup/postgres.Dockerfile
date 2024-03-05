FROM postgres:14-alpine

# The PostgreSQL user (useful to connect to the database)
ENV POSTGRES_USER=admin
# The PostgreSQL password (useful to connect to the database)
ENV POSTGRES_PASSWORD=admin
# The PostgreSQL default database (automatically created at first launch)
ENV POSTGRES_DB=postgresql

EXPOSE 5432