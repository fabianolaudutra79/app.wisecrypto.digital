import { Client } from 'pg';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'postgres',
  });

  try {
    await client.connect();

    // Create the users table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `);

    console.log(`Created "users" table`);

    // Insert initial user data
    const initialUsers = Array.from({ length: 10 }).map(() => {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      return { username, email, password };
    });

    for (const user of initialUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.query(
        `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO NOTHING;
      `,
        [user.username, user.email, hashedPassword]
      );
    }

    console.log(`Seeded ${initialUsers.length} users`);

    await client.end();
  } catch (error) {
    console.error('Failed to seed the database:', error);
    await client.end();
  }
}

seed();

