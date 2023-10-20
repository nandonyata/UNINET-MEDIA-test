const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const routes = require('./routes');
const { connectDb } = require('./configs/mongoDb');
const errorHandler = require('./middlewares/error.handler');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectDb()
  .then(() => {
    console.log('Connected to mongoDb');
  })
  .catch((err) => console.log(`mongoDb err: ${err}`));

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
