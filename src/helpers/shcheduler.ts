import cron from 'node-cron';
import { loadData } from '../services/itemService';
import { shchedulersCrons } from '../../configuration';


export const setShchedulers = () => {
    cron.schedule(shchedulersCrons.LOAD_FILE_CRON, async () => {
        try {
            await loadData();
            console.log('shchedule completed')
        } catch(err){
            console.error(err);
        }
      }).start();
}