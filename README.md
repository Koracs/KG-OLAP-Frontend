# KG-OLAP Frontend
Big KG-OLAP is a framework for knowledge graph OLAP systems, where the user can ingest vast amount of data and then perform analytics using **SQL-like queries**. 
The system is based on Knowledge graphs and **provides a RESTful API** to allow the user to ingest new data to the system and query from the system.
This frontend is a **Next.js** application that provides a user interface for the system.

## Features

### Login / Authentication
This Application uses **Keycloak** as an authentication server. Through **NextAuth.js**, the user can log in to create a Keycloak session and then use the application.

### Query IDE
The KG-OLAP backend allows the user to query using **SQL-Like queries**. Through this frontend application, queries are parsed, validated and passed on to the backend system. These results are then stored in a **Redis cache** and displayed upon arrival.

### Display Query Results
After receiving a query, the backend system returns the requested data and information such as performance timestamps and result file sizes. These results are displayed in various ways.
The user can view the results in a **table**, list the **contexts of the results**, or view the results of a given context as a **graph**. The graph is rendered using **D3.js** and is **pre-rendered on the server**. The result metrics are also displayed to the user.
The results, which are stored in a **Redis cache**, can be **re-executed** with the original query to view the newest results again.

## Installation
 1. Run npm install
 2. Run Docker Compose
 3. Setup Keycloak via Realm Export
 4. Fill .env for container deployment (example below)
 5. Fill .env.local for local development (example below)

## Example .env
```
KEYCLOAK_AUTH_SERVER_URL=http://localhost:8081
JWK_SET_URI=http://localhost:8081/realms/kgolap/protocol/openid-connect/certs
KEYCLOAK_ID=nextjs-frontend
KEYCLOAK_SECRET=YOURSECRETHERE (From installation step 3)
KEYCLOAK_ISSUER=http://localhost:8081/auth/realms/kgolap
KEYCLOAK_REFRESH_TOKEN_URL=http://localhost:8081/auth/realms/kgolap/protocol/openid-connect/token
END_SESSION_URL=http://localhost:8081/auth/realms/kgolap/protocol/openid-connect/logout
NEXTAUTH_SECRET=YOURSECRETHERE (Random String)
NEXTAUTH_URL_INTERNAL=http://localhost:3000/
KGOLAP_SURFACE_URL=http://localhost:8080/kgolap
KGOLAP_USERNAME=YOURUSERHERE
KGOLAP_PASSWORD=YOURPASSWORDHERE
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@host.docker.internal:5432/kgolap?connect_timeout=100&schema=kgolap"
REDIS_PASSWORD=redisPa55w0rd
POSTGRES_USER=user
POSTGRES_PASSWORD=password
KEYCLOAK_USER=user
KEYCLOAK_PASSWORD=password
PGADMIN_DEFAULT_EMAIL=example@example.com
PGADMIN_DEFAULT_PASSWORD=password
```

## Example .env.local
```
KEYCLOAK_ID=nextjs-frontend
KEYCLOAK_SECRET=YOURSECRETHERE (From installation step 3)
KEYCLOAK_ISSUER=http://localhost:8081/auth/realms/kgolap
KEYCLOAK_REFRESH_TOKEN_URL=http://localhost:8081/auth/realms/kgolap/protocol/openid-connect/token
END_SESSION_URL=http://localhost:8081/auth/realms/kgolap/protocol/openid-connect/logout
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOURSECRETHERE (Random String)
```

## Literature
[1]	B. Ahmad, "A Distributed and Parallel Processing Framework for Knowledge Graph OLAP," in The Semantic Web: ESWC 2023 Satellite Events: Hersonissos, Crete, Greece, May 28 - June 1, 2023, Proceedings, 2023, pp. 288–297. [Online]. Available: https://link.springer.com/chapter/10.1007/978-3-031-43458-7_47

[2]	C. G. Schuetz, L. Bozzato, B. Neumayr, M. Schrefl, and L. Serafini, "Knowledge Graph OLAP: A multidimensional model and query operations for contextualized knowledge graphs," Semantic Web 12, 2021, doi: 10.3233/SW-200419.
