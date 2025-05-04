const express = require('express');
const cors = require('cors');
const { specs, swaggerUi } = require('./swagger');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);

// Swagger dokumentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error hantering
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;