const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const verifyAccessToken = require("../middleware/verifyJWT");

const serverConfig = app => {
	app.use('/uploads', express.static('uploads'));
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser())
	app.use(verifyAccessToken)
	app.use(cors({
		origin: 'http://localhost:5173',
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'X-Requested-With',
			'Accept',
			'Origin',
			'User-Agent',
			'X-HTTP-Method-Override',
			'Cache-Control',
			'If-Modified-Since',
			'X-Frame-Options',
			'Referer',
			'Accept-Language',
			'Accept-Encoding'
		]
	}));
};

module.exports = serverConfig;
