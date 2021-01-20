export default () => ({
    port: process.env.port || process.env.PORT || 3001,
    secret: process.env.SESSION_SECRET_KEY,
    database: {
        pg: {
            host: process.env.DATABASE_PG_HOST,
            port: parseInt(process.env.DATEBASE_PG_PORT, 10) || 5432,
            database: process.env.DATABASE_PG_NAME,
            username: process.env.DATABASE_PG_USER,
            password: process.env.DATABASE_PG_PASSWORD,
        },
    },
  });