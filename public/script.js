const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'nonprofits.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ensure data directory and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

if (!fs.existsSync(DATA_FILE)) {
  const initialData = [
    {
      id: 1,
      name: "Ocean Wise Conservation Association",
      category: "Environment",
      description: "Protecting and restoring our oceans through research, education, and community action.",
      website: "https://ocean.org",
      email: "info@ocean.org",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Greater Vancouver Food Bank",
      category: "Food Security",
      description: "Providing nutritious food to those in need across Metro Vancouver.",
      website: "https://foodbank.bc.ca",
      email: "info@foodbank.bc.ca",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Covenant House Vancouver",
      category: "Youth & Housing",
      description: "Serving homeless and at-risk youth with shelter, crisis care, and support services.",
      website: "https://covenanthousebc.org",
      email: "info@covenanthousebc.org",
      createdAt: new Date().toISOString()
    }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// GET all nonprofits
app.get('/api/nonprofits', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const nonprofits = JSON.parse(data);
    res.json(nonprofits);
  } catch (error) {
    console.error('Error reading nonprofits:', error);
    res.status(500).json({ error: 'Failed to load nonprofits' });
  }
});

// POST new nonprofit
app.post('/api/nonprofits', (req, res) => {
  try {
    const { name, category, description, website, email } = req.body;

    // Validation
    if (!name || !category || !description || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Read current data
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const nonprofits = JSON.parse(data);

    // Create new nonprofit
    const newNonprofit = {
      id: nonprofits.length > 0 ? Math.max(...nonprofits.map(n => n.id)) + 1 : 1,
      name,
      category,
      description,
      website: website || '',
      email,
      createdAt: new Date().toISOString()
    };

    // Add to array
    nonprofits.push(newNonprofit);

    // Save to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(nonprofits, null, 2));

    res.status(201).json(newNonprofit);
  } catch (error) {
    console.error('Error creating nonprofit:', error);
    res.status(500).json({ error: 'Failed to create nonprofit' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📂 Open http://localhost:${PORT} in your browser\n`);
});