const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(3000, '0.0.0.0', () => {
    console.log("Server listening on port 3000");
    readJson("./database.json");
});

function readJson(jsonData) {
    fs.readFile(jsonData, "utf8", (err, jsonString) => {
        if (err) {
          console.log("Error reading file: ", err);
          return;
        }
    
        try {
            sortTables(jsonString);
        } catch (error) {
            console.log("Error processing data: ", error);
        }
    });      
}

function sortTables(data) {
    const tables = JSON.parse(data);

    let foreignKeys = [];
    const prioritized = tables.map((t) => {

        t.columns.forEach(col => {
            if(col.foreign_key !== null) {
                foreignKeys.push(col.foreign_key.split('.')[0]);
            }
        });

        return {
            priority: 0, 
            name: t.name,
            columns: t.columns}
    });

    prioritized.forEach(table => {
        if(foreignKeys.includes(table.name)) {
            table.priority ++;
        }

        let noForeignKey = true;
        table.columns.forEach(col => {
            if(col.foreign_key !== null) {
                noForeignKey = false;
            }
        });

        if(noForeignKey) table.priority ++;
    });

    prioritized.sort((a, b) => b.priority - a.priority);
    const result = prioritized.map(p => p.name);

    console.log(result);
    return JSON.stringify(result);
}