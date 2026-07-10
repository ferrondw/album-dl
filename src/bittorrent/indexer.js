import { fileURLToPath } from 'url';
import { exec, execSync } from 'child_process';
import { FolderNameSanitizer } from '../utils/FolderNameSanitizer.js';
import YTMusic from 'ytmusic-api';
import NodeID3 from 'node-id3';
import express from 'express';
import path from 'path';
import fs from 'fs';

export default function initIndexer(app) {
    app.get('/indexer/api', async (req, res) => {
        const { t } = req.query;
        if (t === 'caps') sendCapabilities(req, res);
        if (t === 'music') search(req, res);
        if (t === 'search') search(req, res);
        if (t === 'get') getRelease(req, res);

        res.status(400);

        return {};
    });

    async function sendCapabilities(req, res) {
        res.type('application/xml');

        res.send(`<?xml version="1.0" encoding="UTF-8"?>
<caps>
    <server version="1.0" title="album-dl"/>
    <limits max="100" default="50"/>
    <searching>
        <search available="yes" supportedParams="q"/>
        <audio-search available="yes" supportedParams="q,artist,album"/>
    </searching>
    <categories>
        <category id="3000" name="Audio">
            <subcat id="3010" name="Audio/MP3"/>
        </category>
    </categories>
</caps>`);
    }

    async function search(req, res) {

    }

    async function getRelease(req, res) {

    }
}