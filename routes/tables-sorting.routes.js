module.exports = (app) => {
    const databaseSort = require('../controllers/tables-sorting.controller');

    // POST database json -> returns sorted tables
    app.post('/sortTables', databaseSort.sortTables);

    // GET sorted tables from database.json
    app.get('/sortTablesFromFile', databaseSort.sortTablesFromFile);
}