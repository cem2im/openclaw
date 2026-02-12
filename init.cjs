const fs = require("fs");
const { execSync } = require("child_process");
const path = "/data/.openclaw";

if (process.env.OPENCLAW_CONFIG_B64) {
  try {
    fs.mkdirSync(path, { recursive: true });
    const config = Buffer.from(process.env.OPENCLAW_CONFIG_B64, "base64").toString("utf8");
    fs.writeFileSync(path + "/openclaw.json", config);
    console.log("[init] Config written to " + path + "/openclaw.json");
    console.log("[init] Config content:", config.substring(0, 100) + "...");
  } catch (e) {
    console.error("[init] Failed:", e.message);
  }
} else {
  console.log("[init] No OPENCLAW_CONFIG_B64, skipping");
}

// Start gateway
console.log("[init] Starting gateway...");
try {
  execSync("node dist/index.js gateway --verbose", { stdio: "inherit" });
} catch (e) {
  console.error("[init] Gateway exited with error:", e.message);
  process.exit(1);
}