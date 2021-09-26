const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/tables-sorting.routes')(app);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server listening on port 3000');
});

module.exports = app