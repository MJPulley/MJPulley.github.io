/* eslint-disable no-console */
import express from 'express';
import fetch from 'node-fetch';

import pgCountySpeedCameras from './speedCameras.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Prince Georges County Speed Cameras API!');
});

// Generic API inclusion demonstration
// Replace this with the group member's actual route
// This leads to /api/member1
router.use('/speedCameras', pgCountySpeedCameras);

export default router;