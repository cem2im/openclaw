// OpenClaw Railway Init Script
// Reads OPENCLAW_CONFIG_B64 env var and writes config file before gateway starts
const fs = require('fs');
const path = '/data/.openclaw';

if (process.env.OPENCLAW_CONFIG_B64) {
  try {
    fs.mkdirSync(path, { recursive: true });
    const config = Buffer.from(process.env.OPENCLAW_CONFIG_B64, 'base64').toString('utf8');
    fs.writeFileSync(path + '/openclaw.json', config);
    console.log('[init] Config written to ' + path + '/openclaw.json');
  } catch (e) {
    console.error('[init] Failed to write config:', e.message);
  }
} else {
  console.log('[init] No OPENCLAW_CONFIG_B64 found, skipping config write');
}