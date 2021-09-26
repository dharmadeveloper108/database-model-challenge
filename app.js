const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(3000, '0.0.0.0', () => {
    console.log('Server listening on port 3000');
    readJson('./database.json');
});

function readJson(jsonData) {
    fs.readFile(jsonData, 'utf8', (err, jsonString) => {
        if (err) {
          console.log('Error reading file: ', err);
          return;
        }
    
        try {
            sortTables(jsonString);
        } catch (error) {
            console.log('Error processing data: ', error);
        }
    });      
}

function sortTables(data) {
    const tables = JSON.parse(data);

    const prioritized = tables.map((t) => {

        return {
            priority: 1, 
            name: t.name,
            columns: t.columns}
    });

    prioritized.forEach(table => {
     
        let noForeignKey = true;
        table.columns.forEach(col => {
            if(col.foreign_key !== null) {
                let foreignTable = prioritized.find(p => p.name === col.foreign_key.split('.')[0]);
                if(foreignTable.priority < prioritized.length)
                    foreignTable.priority = table.priority +1;
                noForeignKey = false;
            }
        });

        if(noForeignKey) {
            table.priority = prioritized.length;
        }
    });

    prioritized.sort((a, b) => b.priority - a.priority);
    const result = prioritized.map(p => p.name);

    console.log(prioritized);
    console.log(result);
    return JSON.stringify(result);
}