import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Настройка подключения к MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Создание таблиц при запуске сервера
const initializeDatabase = async () => {
  try {
    // Создание базы данных, если её нет
    await db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} is ready`);

    // Использование базы данных
    await db.query(`USE ${process.env.DB_NAME}`);

    // Создание таблицы users
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        steamId VARCHAR(50) UNIQUE NOT NULL,
        username VARCHAR(100),
        avatar VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "users" is ready');

    // Создание таблицы drops
    await db.query(`
      CREATE TABLE IF NOT EXISTS drops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        itemName VARCHAR(100) NOT NULL,
        itemType VARCHAR(50),
        dropDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        itemValue DECIMAL(10, 2),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Table "drops" is ready');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Тестовый маршрут
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.send(`Backend is running! MySQL test: ${JSON.stringify(rows)}`);
  } catch (error) {
    res.status(500).send('Error connecting to MySQL');
    console.error(error);
  }
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await initializeDatabase();
});