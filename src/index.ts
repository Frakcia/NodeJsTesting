import express from 'express';
import compression from 'compression'
import router from './router';
import { setShchedulers } from './helpers/shcheduler';

const app = express();

app.use(compression());
app.use('/', router());

const PORT = process.env.PORT || 3002;

setShchedulers();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });