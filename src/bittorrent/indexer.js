import { fileURLToPath } from 'url';
import { exec, execSync } from 'child_process';
import { FolderNameSanitizer } from '../utils/FolderNameSanitizer.js';
import YTMusic from 'ytmusic-api';
import NodeID3 from 'node-id3';
import express from 'express';
import path from 'path';
import fs from 'fs';

const ytmusic = new YTMusic();
await ytmusic.initialize();

export default function initIndexer(app) {
    app.get('/indexer/api', async (req, res) => {
        const t = req.query.t;
        if (t === 'caps') return sendCapabilities(req, res);
        if (t === 'music') return search(req, res);
        if (t === 'search') return search(req, res);
        if (t === 'get') return getRelease(req, res);

        res.status(400);
        res.send('nah');
    });

    async function sendCapabilities(req, res) {
        res.type('application/xml');
        res.send(`<?xml version="1.0" encoding="UTF-8"?>
<caps>
    <server version="1.0" title="ytarr"/>
    <limits max="100" default="50"/>
    <searching>
        <search available="yes" supportedParams="q"/>
        <music-search available="yes" supportedParams="q,artist,album"/>
    </searching>
    <categories>
        <category id="3000" name="Audio">
            <subcat id="3010" name="MP3"/>
        </category>
    </categories>
</caps>`);
    }

    async function search(req, res) {
        const q = decodeURIComponent(req.query.q);
        console.log(q);
        const album = (await ytmusic.searchAlbums(q))[0];
        console.log(album);

        res.type('application/xml');
        res.send(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<item>
			<title>${album.name} - ${album.artist.name} [${album.albumId}]</title>
			<pubDate>Thu, 1 Jan 2026 00:00:00 GMT</pubDate>
			<enclosure
                url="http://localhost:5071/indexer/api?t=get"
                length="20000000"
                type="application/x-bittorrent"/>
		</item>
	</channel>
</rss>`);
    }

    async function getRelease(req, res) {
        res.sendStatus(404);
    }
}