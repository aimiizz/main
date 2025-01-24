import express from 'express';
import authRoutes from './routes/authRoutes'; // Default import
// Import named export

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
}); 

app.use('/api', authRoutes); // Prefix the routes with /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

