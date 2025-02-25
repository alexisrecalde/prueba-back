import app from './server';
import { config } from './config';
import { initializeDatabase } from './utils/dbUtils';

const PORT = config.port;

try {
  initializeDatabase();
} catch (error) {
  console.error('Error inicializando la base de datos:', error);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});