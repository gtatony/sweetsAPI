import express from 'express';
import bodyParser from 'body-parser';
import data from './data.js'; // Assuming './data.js' exports the 'data' variable

const router = express.Router();

// Middleware
router.use(bodyParser.json());

// Routes
router.get('/', (req,res) => {
    res.send('Sweets API !!!');
});

router.get('/api/sweets', (req,res) => {
    res.send(data);
});

// GET request to fetch all sweet boxes
router.get('/sweetboxes', (req, res) => {
  res.json(data);
});

// GET request to retrieve a specific sweet box by boxtype and sweetweight
router.get('/sweetboxes/:boxtype/:sweetweight', (req, res) => {
  const { boxtype, sweetweight } = req.params;
  const sweetBox = data.find(box => box.boxtype === boxtype && box.sweetweight === sweetweight);
  
  if (sweetBox) {
    res.json(sweetBox);
  } else {
    res.status(404).json({ error: `Sweet box with boxtype ${boxtype} and sweetweight ${sweetweight} not found` });
  }
});

// POST request to create a new sweet box
router.post('/sweetboxes', (req, res) => {
  const newSweetBox = req.body;

  // Validate input
  if (!newSweetBox.boxtype || !newSweetBox.sweetweight) {
    return res.status(400).json({ error: 'Boxtype and sweetweight are required' });
  }

  data.push(newSweetBox);
  res.status(201).json(newSweetBox); // Respond with the created sweet box
});

// PUT request to update a specific sweet box by boxtype and sweetweight
router.put('/sweetboxes/:boxtype/:sweetweight', (req, res) => {
  const { boxtype, sweetweight } = req.params;
  const updatedSweetBox = req.body;
  const index = data.findIndex(box => box.boxtype === boxtype && box.sweetweight === sweetweight);

  if (index !== -1) {
    data[index] = updatedSweetBox;
    res.json(updatedSweetBox); // Respond with the updated sweet box
  } else {
    res.status(404).json({ error: `Sweet box with boxtype ${boxtype} and sweetweight ${sweetweight} not found` });
  }
});

// DELETE request to delete a specific sweet box by boxtype and sweetweight
router.delete('/sweetboxes/:boxtype/:sweetweight', (req, res) => {
  const { boxtype, sweetweight } = req.params;
  const index = data.findIndex(box => box.boxtype === boxtype && box.sweetweight === sweetweight);

  if (index !== -1) {
    data.splice(index, 1);
    res.json({ message: `Sweet box with boxtype ${boxtype} and sweetweight ${sweetweight} deleted` });
  } else {
    res.status(404).json({ error: `Sweet box with boxtype ${boxtype} and sweetweight ${sweetweight} not found` });
  }
});

export default router;
