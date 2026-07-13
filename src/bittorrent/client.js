import { fileURLToPath } from 'url';
import { exec, execSync } from 'child_process';
import { FolderNameSanitizer } from '../utils/FolderNameSanitizer.js';
import YTMusic from 'ytmusic-api';
import NodeID3 from 'node-id3';
import express from 'express';
import path from 'path';
import fs from 'fs';

const torrents = [];

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
                "savePath": ""
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
                    "savePath": ""
                }
            },
            "server_state": {
                "connection_status": "connected",
            }
        });
    });

    app.post('/api/v2/torrents/add', (req, res) => {
    });

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