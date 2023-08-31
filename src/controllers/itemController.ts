import express from 'express';
import {loadData} from '../services/itemService'
import { httpStatusCodes } from '../common/httpStatusCodes';

export const loadItems = async (req: express.Request, res: express.Response) => {
    try{
        await loadData();
    }catch(err){
        console.error(err.message);
        return res.sendStatus(httpStatusCodes.INTERNAL_SERVER);
    }

    return res.sendStatus(200);
}