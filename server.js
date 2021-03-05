const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./app/models');
const Role = db.role;

global.__basedir = __dirname + '/..';

// const corsOption = {
//   origin: 'http://localhost:8081'
// };
// app.use(cors(corsOption));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db');
  initial();
});


// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to treasure‘s application.' });
// });
require('./app/routes/tutorial.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/web.routes')(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function initial() {
  Role.create({
    id: 1,
    name: 'user'
  });
  Role.create({
    id: 2,
    name: 'moderator'
  });
  Role.create({
    id: 3,
    name: 'admin'
  });
}
