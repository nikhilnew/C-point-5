const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: '103.228.83.115',
    user: 'root',
    password: 'Cylsys@678',
    database: 'cylsys_lunch',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// MySQL Table Creation Query
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS grocery_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    expiration_date DATE NOT NULL
  );
`;

db.query(createTableQuery, err => {
  if (err) {
    console.error('Error creating table: ' + err.stack);
    return;
  }
//   console.log('Table created or already exists');
});

// POST Endpoint - Add Grocery Item
app.post('/add-item', (req, res) => {
    const { name, category, quantity, price, expiration_date } = req.body;
  
    // Validation
    if (!name || !category || !quantity || !price || !expiration_date) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Check if item with the same name already exists
    const checkItemQuery = 'SELECT id FROM grocery_inventory WHERE name = ? LIMIT 1';
  
    db.query(checkItemQuery, [name], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking item existence: ' + checkErr.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (checkResults.length > 0) {
        return res.status(409).json({ error: 'Item with the same name already exists' });
      }
  
      // If item doesn't exist, insert it into the database
      const addItemQuery = `
        INSERT INTO grocery_inventory (name, category, quantity, price, expiration_date)
        VALUES (?, ?, ?, ?, ?)
      `;
  
      db.query(addItemQuery, [name, category, quantity, price, expiration_date], (err, results) => {
        if (err) {
          console.error('Error adding item: ' + err.stack);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.status(201).json({ message: 'Item added successfully', itemId: results.insertId });
      });
    });
  });

  
  // Delete a department
app.delete('/departments/:id', (req, res) => {
    const departmentId = req.params.id;
  
    db.query('DELETE FROM grocery_inventory WHERE id = ?', [departmentId], (error) => {
      if (error) {
        console.error('Error deleting Item:', error);
        return res.status(500).send('Error deleting Item');
      }
  
      res.status(200).send('Item deleted successfully');
    });
  });

// GET Endpoint - Retrieve All Items
app.get('/get-items', (req, res) => {
  const getItemsQuery = 'SELECT * FROM grocery_inventory';

  db.query(getItemsQuery, (err, results) => {
    if (err) {
      console.error('Error retrieving items: ' + err.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ items: results });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
