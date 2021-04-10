import express from 'express';
import path from 'path';
export const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.render('index.html');
});
