const express = require('express')
const cors = require('cors')
const mongoConnect = require('./util/database').MongoConnect;
require('dotenv').config()

const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
const exerciseRoutes = require('./routes/exercise');

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('public'))

app.use('/api/exercise', userRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use(homeRoutes);

mongoConnect(() => {
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
});
