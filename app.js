const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const routes = require('./routes');
const { connectDb } = require('./configs/mongoDb');

app.use(cors());

connectDb()
  .then(() => {
    console.log('Connected to mongoDb');
  })
  .catch((err) => console.log(`mongoDb err: ${err}`));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
