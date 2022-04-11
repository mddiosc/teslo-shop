# Next.js Teslo Shop App

Para arrancar en local, se necesita la base de datos

```
docker-compose up -d
```

MongoDB URL Local:

```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

## LLenar la base de datos con información de pruebas

Llamar a:

```
localhost:3000/api/seed
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**
\*MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

- Reconstruir los módilos de node y arrancar en local

```
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas

Llamar a:

```
http://localhost:3000/api/seed
```
