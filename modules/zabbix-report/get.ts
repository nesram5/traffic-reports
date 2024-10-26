import puppeteer  from 'puppeteer-core';
import path from 'path';
import * as os from 'os';

let browser: any;
let page: any;

export function restoreToinit(){
    browser = '';
    page = '';
}

async function login() {

    const username = String(process.env.ZABBIX_USER);
    const password = String(process.env.PASSWORD);
    
    //Check Os    
    const browserPath = pathToBrowser()
    
    try {
    browser = await puppeteer.launch({
        executablePath: browserPath, 
        args: [
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
        ],
        headless: true 
    });

    page = await browser.newPage();
    
    const response = await page.goto('http://10.3.0.254/zabbix/index.php', {
        waitUntil: 'networkidle2',
        timeout: 10000 
    });

    if (response && response.ok()) {
        console.log('Page loaded successfully:', page.url());
    } else {
        console.log('Failed to load the page. Status code:', response ? response.status() : 'Unknown');
    }
    } catch (error) {
        console.error('Error connecting to the page:', error);
        return ("Cannot connect to the web");
    }

    await page.type('#name', username); 
    await page.type('#password', password);
    await page.click('#enter'); 

    await page.waitForNavigation();
}
export async function gatherMainData(pageLink: any) {
    if (!browser) {
        await login(); 
    }

    try {
        await page.goto(pageLink); 
    } catch (error) {
        console.log(`Error opening link ${pageLink}: check the JSON file`);
        console.error(`Error opening link ${pageLink}: check the JSON file`, error);
        return 'Navigation error'; 
    }

    let mainData = await page.evaluate(() => {
        const mainElement = document.querySelector('main');
        return mainElement ? mainElement.innerText : 'Main element not found';
    });

    return mainData; 
}

export async function closeBrowser() {
    if (browser) {
        await browser.close();
    }
}

export function getDownloadValue(logs: any, timestamp: any) {
    if (typeof logs !== 'string') {
        console.error('The logs parameter should be a string.');
        return null; 
    }

    const lines = logs.split('\n').filter(line => line.trim() !== '');
    let closestValue = null;
    let closestDiff = Infinity;
    const targetTime = new Date(timestamp).getTime();

    lines.forEach(line => {
        const parts = line.split(' ');
        if (parts.length < 4) return; 

        const logTime = new Date(parts[0] + ' ' + parts[1]).getTime();
        const byteValue = parseInt(parts[3], 10);

        const diff = Math.abs(logTime - targetTime);

        if (diff < closestDiff) {
            closestDiff = diff;
            closestValue = byteValue;
        }
    });

    if (closestValue !== null) {
        return closestValue / 1e6; 
    } else {
        console.log('No matching timestamp found.');
        return null; 
    }
}

export function getCurrentTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function pathToBrowser(): any {
    let winBrowser = path.join('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe');
    let linuxBrowser = path.join('/usr/bin/chromium');
    let pathToBrowser: any;
    if(isOS('windows')){
        pathToBrowser = winBrowser;
    } else{
        pathToBrowser = linuxBrowser;
    }
    return pathToBrowser;
}

function isOS(targetOS: 'windows' | 'linux'): boolean {
    const platform = os.platform();
    return (targetOS === 'windows' && platform === 'win32') || 
           (targetOS === 'linux' && platform === 'linux');
}