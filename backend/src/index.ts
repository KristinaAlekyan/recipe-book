import express from 'express';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});