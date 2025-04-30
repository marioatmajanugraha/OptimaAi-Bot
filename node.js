const axios = require('axios');
const chalk = require('chalk');
const cfonts = require('cfonts');
const { HttpProxyAgent } = require('http-proxy-agent');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { SocksProxyAgent } = require('socks-proxy-agent');
const readlineSync = require('readline-sync');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// List of random User-Agent strings
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/135.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:129.0) Gecko/20100101 Firefox/129.0'
];

// Display Banner
cfonts.say('Airdrop 888', {
    font: 'block',
    align: 'center',
    colors: ['cyan', 'yellow'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
});

// Display Script Info
console.log(chalk.magentaBright.bold('\nScript coded by - @balveerxyz | Channel Tele: t.me/airdroplocked | Auto Nodes Optima Ai 🚀\n'));

// Function to read proxies from proxy.txt
async function readProxies() {
    try {
        const data = await fs.readFile('proxy.txt', 'utf8');
        return data.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error(chalk.red(`❌ Error reading proxy.txt: ${error.message}`));
        return [];
    }
}

// Function to read tokens from tokens.txt
async function readTokens() {
    try {
        const data = await fs.readFile('tokens.txt', 'utf8');
        return data.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error(chalk.red(`❌ Error reading tokens.txt: ${error.message}`));
        return [];
    }
}

// Function to read cookies from cookies.txt
async function readCookies() {
    try {
        const data = await fs.readFile('cookies.txt', 'utf8');
        return data.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error(chalk.red(`❌ Error reading cookies.txt: ${error.message}`));
        return [];
    }
}

// Function to create proxy agent
function createProxyAgent(proxy) {
    // Check for IP:PORT format using regex
    const ipPortRegex = /^(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/;
    if (ipPortRegex.test(proxy)) {
        return new HttpsProxyAgent(`http://${proxy}`);
    }
    if (proxy.startsWith('http://') || proxy.startsWith('https://')) {
        return new HttpsProxyAgent(proxy);
    } else if (proxy.startsWith('socks4://') || proxy.startsWith('socks5://')) {
        return new SocksProxyAgent(proxy);
    }
    console.error(chalk.red(`❌ Unsupported proxy format: ${proxy}`));
    return null;
}

// Function to get random User-Agent
function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Function to fetch stats
async function fetchStats(token, cookie = null, proxyAgent = null) {
    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'User-Agent': getRandomUserAgent()
        };
        if (cookie) {
            headers['Cookie'] = cookie;
        }

        const response = await axios.get('https://api.optimai.network/dashboard/stats', {
            headers,
            httpsAgent: proxyAgent
        });

        // Check if expected data exists
        if (!response.data || !response.data.stats) {
            throw new Error('Invalid response structure: stats data not found');
        }

        // Simplified raw response
        console.log(chalk.gray('📋 Stats Summary:'));
        console.log(chalk.gray(`  Rewards: ${response.data.stats.total_rewards || 'N/A'}`));
        console.log(chalk.gray(`  Tasks: ${response.data.stats.total_tasks || 'N/A'}`));
        console.log(chalk.gray(`  Uptime: ${response.data.stats.total_uptime || 'N/A'} hrs`));
        console.log(chalk.gray(`  Change: ${response.data.stats.total_change_amount || 'N/A'} (${response.data.stats.total_change_percentage || 'N/A'}%)`));

        console.log(chalk.greenBright(`✅ Stats Fetched Successfully!`));
        console.log(chalk.cyan(`📊 Total Rewards: ${response.data.stats.total_rewards || 'N/A'}`));
        console.log(chalk.cyan(`📈 Total Tasks: ${response.data.stats.total_tasks || 'N/A'}`));
        console.log(chalk.cyan(`⏰ Total Uptime: ${response.data.stats.total_uptime || 'N/A'} hours`));
        console.log(chalk.cyan(`💹 Total Change Amount: ${response.data.stats.total_change_amount || 'N/A'}`));
        console.log(chalk.cyan(`📉 Total Change Percentage: ${response.data.stats.total_change_percentage || 'N/A'}%`));
        console.log('');
    } catch (error) {
        console.error(chalk.red(`❌ Error fetching stats: ${error.message}`));
        if (error.response) {
            console.error(chalk.red(`   Status Code: ${error.response.status}`));
            console.error(chalk.red(`   Response: ${JSON.stringify(error.response.data, null, 2)}`));
        }
    }
}

// Function to fetch node operator rewards
async function fetchRewards(token, cookie = null, proxyAgent = null) {
    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'User-Agent': getRandomUserAgent()
        };
        if (cookie) {
            headers['Cookie'] = cookie;
        }

        const response = await axios.get('https://api.optimai.network/dashboard/node-operator-rewards', {
            headers,
            httpsAgent: proxyAgent
        });

        // Check if expected data exists
        if (!response.data) {
            throw new Error('Invalid response structure: rewards data not found');
        }

        // Simplified raw response
        console.log(chalk.gray('📋 Rewards Summary:'));
        console.log(chalk.gray(`  Data Requests: ${response.data.data_requests || 'N/A'}`));
        console.log(chalk.gray(`  Uptime: ${response.data.uptime_hours || 'N/A'} hrs`));

        console.log(chalk.greenBright(`✅ Rewards Fetched Successfully!`));
        console.log(chalk.cyan(`📡 Data Requests: ${response.data.data_requests || 'N/A'}`));
        console.log(chalk.cyan(`🕒 Uptime Hours: ${response.data.uptime_hours || 'N/A'}`));
        console.log('');
    } catch (error) {
        console.error(chalk.red(`❌ Error fetching rewards: ${error.message}`));
        if (error.response) {
            console.error(chalk.red(`   Status Code: ${error.response.status}`));
            console.error(chalk.red(`   Response: ${JSON.stringify(error.response.data, null, 2)}`));
        }

        // Retry without cookie if 403
        if (error.response?.status === 403 && cookie) {
            console.log(chalk.yellow(`⚠️ Retrying rewards fetch without cookie...`));
            try {
                const retryHeaders = {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'User-Agent': getRandomUserAgent()
                };

                const retryResponse = await axios.get('https://api.optimai.network/dashboard/node-operator-rewards', {
                    headers: retryHeaders,
                    httpsAgent: proxyAgent
                });

                // Simplified raw retry response
                console.log(chalk.gray('📋 Retry Rewards Summary:'));
                console.log(chalk.gray(`  Data Requests: ${retryResponse.data.data_requests || 'N/A'}`));
                console.log(chalk.gray(`  Uptime: ${retryResponse.data.uptime_hours || 'N/A'} hrs`));

                console.log(chalk.greenBright(`✅ Rewards Fetched Successfully (Retry)!`));
                console.log(chalk.cyan(`📡 Data Requests: ${retryResponse.data.data_requests || 'N/A'}`));
                console.log(chalk.cyan(`🕒 Uptime Hours: ${retryResponse.data.uptime_hours || 'N/A'}`));
                console.log('');
            } catch (retryError) {
                console.error(chalk.red(`❌ Retry failed: ${retryError.message}`));
                if (retryError.response) {
                    console.error(chalk.red(`   Status Code: ${retryError.response.status}`));
                    console.error(chalk.red(`   Response: ${JSON.stringify(retryError.response.data, null, 2)}`));
                }
            }
        }
    }
}

// Main function
async function main() {
    // Ask user about proxy usage
    const useProxy = readlineSync.question(chalk.yellow('Mau menggunakan proxy? (y/n): ')).toLowerCase() === 'y';

    let proxies = [];
    if (useProxy) {
        proxies = await readProxies();
        if (proxies.length === 0) {
            console.log(chalk.yellow('⚠️ No proxies found in proxy.txt. Proceeding without proxy.'));
        }
    }

    // Read tokens
    const tokens = await readTokens();
    if (tokens.length === 0) {
        console.log(chalk.red('❌ No tokens found in tokens.txt. Exiting...'));
        return;
    }

    // Read cookies
    const cookies = await readCookies();
    if (cookies.length === 0) {
        console.log(chalk.yellow('⚠️ No cookies found in cookies.txt. Proceeding without cookies.'));
    }

    let isRunning = true;

    // Handle SIGINT (Ctrl+C)
    process.on('SIGINT', () => {
        console.log(chalk.yellow('\n🛑 SIGINT received. Stopping bot...'));
        isRunning = false;
        // Ensure process exits cleanly
        setTimeout(() => {
            console.log(chalk.magentaBright('🎉 Bot stopped gracefully! 🚀'));
            process.exit(0);
        }, 1000);
    });

    // Main loop
    let cycleCount = 0;
    while (isRunning) {
        cycleCount++;
        console.log(chalk.blueBright(`\n🔄 Starting Cycle ${cycleCount} 🔄`));

        // Process each token
        for (let i = 0; i < tokens.length && isRunning; i++) {
            const token = tokens[i].trim();
            console.log(chalk.blueBright(`\n🌟 Processing Token ${i + 1}/${tokens.length} 🌟`));

            // Select proxy if available
            let proxyAgent = null;
            let deviceId = null;
            if (useProxy && proxies.length > 0) {
                const proxy = proxies[i % proxies.length];
                deviceId = uuidv4(); // Generate unique device-id-storage-key for each proxy
                console.log(chalk.gray(`🛡️ Using Proxy: ${proxy}`));
                console.log(chalk.gray(`🆔 Device ID: ${deviceId}`));
                proxyAgent = createProxyAgent(proxy);
            }

            // Select cookie if available
            let cookie = null;
            if (cookies.length > 0) {
                cookie = cookies[i % cookies.length];
                console.log(chalk.gray(`🍪 Using Cookie: ${cookie}`));
            }

            // Fetch stats and rewards with 1-second delay
            await fetchStats(token, cookie, proxyAgent);
            if (isRunning) {
                console.log(chalk.gray('⏳ Waiting 1 second after fetching stats...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            if (isRunning) {
                await fetchRewards(token, cookie, proxyAgent);
                console.log(chalk.gray('⏳ Waiting 1 second after fetching rewards...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Delay between tokens
            if (i < tokens.length - 1 && isRunning) {
                console.log(chalk.gray('⏳ Waiting 2 seconds before processing next token...'));
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        // Delay between cycles
        if (isRunning) {
            console.log(chalk.gray(`⏰ Waiting 60 seconds before next cycle...`));
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }

    console.log(chalk.magentaBright('🎉 Bot stopped gracefully! 🚀'));
}

// Run the bot
main().catch(error => {
    console.error(chalk.red(`❌ Bot encountered an error: ${error.message}`));
    process.exit(1);
});