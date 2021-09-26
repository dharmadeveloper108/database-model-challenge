exports.sortTables = (req, res) => {

    try {
        const data = req.body;

        if (!Object.keys(data).length) {
            res.status(400).send(`Error: empty database model.`);
            return;
        }

        res.status(200).send(sortTables(data));

    } catch (e) {
        res.status(400).send(`Error: ${e}`);
        return;
    }
}

function sortTables(tables) {

    const prioritized = tables.map(t => ({
        priority: 1,
        name: t.name,
        columns: t.columns
    }));

    const maxPriority = prioritized.length;

    prioritized.forEach(table => {

        let noForeignKey = true;
        table.columns.forEach(col => {
            if (col.foreign_key !== null) {
                const foreignTableName = col.foreign_key.split('.')[0];
                const foreignTable = prioritized.find(p => p.name === foreignTableName);

                if (foreignTable.priority < maxPriority)
                    foreignTable.priority = table.priority + 1;
                noForeignKey = false;
            }
        });

        if (noForeignKey) {
            table.priority = maxPriority;
        }
    });

    prioritized.sort((a, b) => b.priority - a.priority);
    const result = prioritized.map(p => p.name);

    return result;
}