import {Items} from '../models/item';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import iconv from 'iconv-lite';
import AdmZip from 'adm-zip';
import {LOAD_BIC_FILE_URL} from '../../configuration';
import { Guid } from "guid-typescript"
import { pool as db } from '../db/db';

const encoding = 'windows-1251';
const xmlFileExt = '.xml';

export const loadData = async () => {
    let items: Items[] = await getDataFromFile();
    for(let i = 0; i< items.length; i++){
        db.query(`INSERT INTO Items(id, name, bic, corrAccount) 
                  values('${items[i].id}', '${items[i].name}', '${items[i].bic}', '${items[i].corrAccount}')`);
    }
}

const getDataFromFile = async (): Promise<Items[]> => {
    const response = await fetch(LOAD_BIC_FILE_URL);
    const buffer = await response.buffer();
    //const buffer = Buffer.from(arrayBuffer);
    const zip = new AdmZip(buffer);

    let items: Items[] = [];

    const zipEntries = zip.getEntries();
    zipEntries.forEach((zipEntry) => {
        if (!zipEntry.isDirectory && zipEntry.entryName.endsWith(xmlFileExt)) {
          const xmlBuffer = zip.readFile(zipEntry);
          if(xmlBuffer === null)
          throw new Error('xml file buffer is null');

          items = parseFromXml(xmlBuffer);
        }
      });

      return items;
}

function parseFromXml(xmlBuffer: Buffer): Items[] {
    let items: Items[] = [];
    const decodedXmlContent = iconv.decode(xmlBuffer, encoding);
        xml2js.parseString(decodedXmlContent, (err, result) => {
          if (err) {
            throw new Error(err.message);
          } else {
            for (let i = 0; i < result.ED807.BICDirectoryEntry.length; i++) {
              const bicDirectory = result.ED807.BICDirectoryEntry[i];
              for (let j = 0; j < bicDirectory.Accounts?.length; j++) {
                const acccc = bicDirectory.Accounts[j].$.Account;
                const bic = bicDirectory.$.BIC;
                const nameP = bicDirectory.ParticipantInfo[0].$.NameP;
                
                const item: Items = { id: Guid.create(), bic, name: nameP, corrAccount: acccc };
                items.push(item);
              }
            }
          }
        });

        return items;
}

