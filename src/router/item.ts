import express from 'express';

import { loadItems } from '../controllers/itemController';


export default(router: express.Router) => {
    router.get('/api/loaditems', loadItems);
}