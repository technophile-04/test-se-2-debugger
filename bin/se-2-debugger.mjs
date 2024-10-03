#!/usr/bin/env node
import { generateTsAbis } from "./generateTsAbis.mjs";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.join(__dirname, "..");

console.log("Initializing se-2-debugger...");

const HARDHAT_ROOT_DIR = process.cwd();

process.env.NEXT_PUBLIC_HARDHAT_ROOT = HARDHAT_ROOT_DIR;

generateTsAbis(HARDHAT_ROOT_DIR);

const nextProcess = spawn("yarn", ["next", "dev", "-p", "8080"], { cwd: appDir });

nextProcess.stdout.on("data", data => {
  const output = data.toString().trim();
  console.log(output);
  if (output.includes("started server on")) {
    console.log("\n🚀 se-2-debugger is now running on http://localhost:8080");
    console.log("Press Ctrl+C to stop the server.\n");
  }
});

nextProcess.stderr.on("data", data => {
  console.error(`Error: ${data}`);
});

nextProcess.on("close", code => {
  if (code !== 0) {
    console.log(`se-2-debugger process exited with code ${code}`);
  }
});

process.on("SIGINT", () => {
  console.log("\nShutting down se-2-debugger...");
  nextProcess.kill();
  process.exit();
});
