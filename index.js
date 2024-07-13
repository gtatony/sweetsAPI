import express from 'express';
import routes from './routes.js';

const app = express();

// Use routes from routes.js
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
