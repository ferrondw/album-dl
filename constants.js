import { fileURLToPath } from 'url';
import YTMusicAPI from 'ytmusic-api';
import NodeID3 from 'node-id3';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ytmusic = new YTMusicAPI();
await ytmusic.initialize();

const Constants = {
    downloadPath: `${__dirname}/downloads/`,
    YTMusic: ytmusic,
    NodeID3: NodeID3
}

export default Constants;