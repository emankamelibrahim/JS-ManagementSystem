// clean-db.js
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

// Convert all string IDs to integers
Object.keys(data).forEach(key => {
  data[key] = data[key].map(item => ({
    ...item,
    id: parseInt(item.id)
  }));
});

fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
console.log('Database cleaned!');