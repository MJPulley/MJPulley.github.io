/* eslint-disable no-console */
import express from 'express';
import fetch from 'node-fetch';

import pgSpeedCameras from './speedCameras.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Prince Georges County Speed Cameras API!');
});

router.use('/speedCameras', pgSpeedCameras);

export default router;