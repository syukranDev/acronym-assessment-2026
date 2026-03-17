require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const requestLogger = require('./middleware/requestLogger');
const logger = require('./config/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

const allowedOrigins = [
    'https://acronymassessment.syukrandev.com',
    'http://localhost:3000' 
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
        return callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
  logger.error('error', {
    message: err.message,
    status: err.status,
    stack: err.stack
  });

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON syntax' });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
