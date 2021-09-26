module.exports = (app) => {
    const databaseSort = require('../controllers/tables-sorting.controller');

    // GET sorted tables
    app.get('/api/sortTables', databaseSort.sortTables);
}