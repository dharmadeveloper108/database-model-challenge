const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs/basicInfo');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

require('./routes/tables-sorting.routes')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Swagger page: http://localhost:4000/api-docs/');
});

module.exports = app;