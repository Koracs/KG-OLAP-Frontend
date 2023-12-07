# KGOLAPFrontEnd

## Installation

 1. Run npm install
 2. Run Docker Compose
 3. Setup Keycloak via Realm Export
 4. add "prisma" user to postgres database (can create databases)
 5. Fill .env (example below)
 6. Fill .env.local (example below)
 7. run npx prisma db push

## Example .env
```
    DATABASE_URL="postgresql://prisma:password@localhost:5432/kgolap?schema=public"
```

## Example .env.local

    KEYCLOAK_ID=nextjs-frontend
    KEYCLOAK_SECRET=YOURSECRETHERE(From installation step 4)
    KEYCLOAK_ISSUER=http://localhost:8081/auth/realms/kgolap
    KEYCLOAK_REFRESH_TOKEN_URL=http://localhost:8081/auth/realms/kgolap/protocol/openid-connect/token
    END_SESSION_URL=http://localhost:8081/auth/realms/kgolap/protocol/openid-connect/logout
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=YOURSECRETHERE(Random String)


