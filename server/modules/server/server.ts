
import { Connections } from './connections';
import { routes, hmr } from 'server/routes';
//mport 'dotenv/config'
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { exec } from "child_process";
import { connectDB }  from '../handlerDB/connect';
import { fetchTrafficDataFromDB } from '../handlerDB/fetch';
import { scheduleExecution } from '../schedule/task';
//import { router } from '../router/routes';
import { autoGetReport } from '../traffic-report/main';
const list_devices = path.join(__dirname, './modules/traffic-report/data/list_devices.json');

export class Server {
	#instance;
	#connections;
	#app;
	#port = 3001;
	#router;

	constructor() {
		this.#start();
	}

	#start() {
		try {
			this.#app = express();
			this.#app.use(cors());
			this.#app.use(express.json());
			this.#app.use(express.static(path.resolve(__dirname, '../../client/build')));
			this.#setHeader();
			this.#router = express.Router();
			routes(this.#app);
			//subscription to listen routes module changes.
			hmr.on('change', this.onChange);
			
			this.#instance = this.#app.listen(this.#port, () => {
				if (!fs.existsSync(list_devices)) {
					console.error('File does not exist:', list_devices);
					return null; 
				}
				connectDB();
				console.log(`Server is running on 'http://localhost:3001'`);
				exec(`explorer 'http://localhost:3001'`, (error, stdout, stderr) => {
					if (error) {
						console.error(`error: ${error.message}`);
						return;
					}
				});
				//autoGetReport();
				//fetchTrafficDataFromDB()
				//scheduleExecution();
			});
			this.#connections = new Connections(this.#instance);
		} catch (exc) {
			console.error('Error', exc);
		}
	}

	#setHeader() {
		this.#app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header(
				'Access-Control-Allow-Headers',
				'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
			);
			res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
			res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
			next();
		});
	}

	onChange = () => {
		this.#connections.destroy();
		this.#instance.close(() => {
			hmr.off('change', this.onChange);
			this.#start();
		});
	};
}