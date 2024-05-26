import "dotenv/config";

const config = {
  driver: "pg",
  dialect: "postgresql",
  url: process.env.DATABASE_URL,
  schema: "./src/server/db/schema.ts",
  ssl: {
    rejectUnauthorized: false
  }
};

export default config;
