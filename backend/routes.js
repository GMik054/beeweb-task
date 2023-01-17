import express from 'express';

import middleware from './middleware/index.js'

const router = express.Router();
import blocksService from './services/blocks.js'

router.post('/sign-in', (req, res) => {
    res.send('Sign in works')
})

router.post('/sign-up', (req, res) => {
    res.send('Sign up works')
})

router.post('/blocks', middleware.decodeToken, async (req, res) => {
    if (!req.body.text) {
        res.status(400).send({message: 'Text field should not be empty!'})
        res.end();
        throw Error('Text field should not be empty!');
    }
    res.json(await blocksService.create(req))
})

router.get('/blocks', middleware.decodeToken, async (req, res) => {
    res.json(await blocksService.get(req));
})

export default router;
