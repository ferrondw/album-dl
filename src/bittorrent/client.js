import parseTorrent from "parse-torrent";
import { releases } from './indexer.js';
import Constants from '../../constants.js';
import multer from 'multer';

export const torrents = [];
const upload = multer({ storage: multer.memoryStorage() });

export default function initClient(app) {
    app.post('/api/v2/auth/login', (req, res) => {
        res.cookie('SID', 'ytarr'); // not really needed but lidarr refuses to connect without cookie
        res.type('text/plain');
        res.send('Ok.');
    });

    app.get('/api/v2/app/version', (req, res) => {
        res.type('text/plain');
        res.send('v5.0.5');
    });

    app.get('/api/v2/app/webapiVersion', (req, res) => {
        res.type('text/plain');
        res.send('2.11.2');
    });

    app.get('/api/v2/app/buildInfo', (req, res) => {
        res.json({});
    });

    app.get('/api/v2/app/preferences', (req, res) => {
        res.json({});
    });

    app.get('/api/v2/torrents/categories', (req, res) => {
        res.json({
            "lidarr": {
                "name": "lidarr",
                "savePath": Constants.downloadPath
            }
        })
    });

    app.get('/api/v2/transfer/info', (req, res) => {
        res.json({
            "connection_status": "connected",
            "dht_nodes": 83,
            "dl_info_data": 0,
            "dl_info_speed": 0,
            "dl_rate_limit": 0,
            "up_info_data": 0,
            "up_info_speed": 0,
            "up_rate_limit": 0
        });
    });

    app.get('/api/v2/sync/maindata', (req, res) => {
        res.json({
            "categories": {
                "lidarr": {
                    "name": "lidarr",
                    "savePath": Constants.downloadPath
                }
            },
            "server_state": {
                "connection_status": "connected",
            }
        });
    });

    // https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-(qBittorrent-5.0)#add-new-torrent
    app.post("/api/v2/torrents/add", upload.single("torrents"), async (req, res) => {
        try {
            const torrent = await parseTorrent(req.file.buffer);
            const id = torrent.name;
            const album = releases.get(id);

            console.log(`Downloading ${album.name}`);
            fetch(`http://localhost:${process.env.PORT || 5071}/download/album/${album.artist.name} - ${album.name}`);

            res.type("text/plain").send("Ok.");
        }
        catch (err) {
            console.error(err);
            res.status(400).send("nah");
        }
    }
    );

    app.post('/api/v2/torrents/delete', (req, res) => {
    });

    app.post('/api/v2/torrents/pause', (req, res) => {
    });

    app.post('/api/v2/torrents/resume', (req, res) => {
    });

    app.get('/api/v2/torrents/info', (req, res) => {
        res.json([]);
    });
}