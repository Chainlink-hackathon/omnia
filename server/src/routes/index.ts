import express from 'express';
export const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.render('index.html');
});

indexRouter.post('/', (req, res) => {
  res.json({
    response: '자알왔다잉',
  });
});
