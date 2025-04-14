import express from 'express';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});