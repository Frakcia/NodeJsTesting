import express from 'express';

import itemsRouters from './item'

const router = express.Router();

export default(): express.Router => {
    itemsRouters(router);
    
    return router;
}