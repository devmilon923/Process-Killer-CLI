#!/usr/bin/env node

import { execSync } from "child_process";
import readline from "readline";
import process from "process";

// ============================================================================
// Colors & Styling
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgCyan: "\x1b[46m",
};

function c(text, color) {
  return `${color}${text}${colors.reset}`;
}

function box(text, color = colors.cyan, width = 50) {
  const padding = Math.max(0, width - text.length - 2);
  const leftPad = Math.floor(padding / 2);
  const rightPad = padding - leftPad;
  return (
    c(`┌${"─".repeat(width)}┐`, color) +
    "\n" +
    c(`│`, color) +
    " ".repeat(leftPad) +
    text +
    " ".repeat(rightPad) +
    c(`│`, color) +
    "\n" +
    c(`└${"─".repeat(width)}┘`, color)
  );
}

function section(title, color = colors.cyan) {
  return (
    c(`╔${"═".repeat(title.length + 2)}╗`, color) +
    "\n" +
    c(`║ ${title} ║`, color) +
    "\n" +
    c(`╚${"═".repeat(title.length + 2)}╝`, color)
  );
}

function line(color = colors.cyan, width = 54) {
  return c(`${"─".repeat(width)}`, color);
}

function header() {
  console.clear();
  console.log("");
  console.log(
    c("╔═══════════════════════════════════════════════════════╗", colors.cyan),
  );
  console.log(
    c("               PORT KILLER UTILITY v1.0.0", colors.bold + colors.cyan),
  );
  //   console.log(c("               Tool By Milon", colors.yellow));
  console.log(
    c("╚═══════════════════════════════════════════════════════╝", colors.cyan),
  );
  console.log("");
}

function info(text, icon = "➜") {
  console.log(c(icon, colors.blue) + " " + text);
}

function success(text, icon = "✓") {
  console.log(c(icon, colors.green) + " " + c(text, colors.green));
}

function error(text, icon = "✗") {
  console.log(c(icon, colors.red) + " " + c(text, colors.red));
}

function warning(text, icon = "⚠") {
  console.log(c(icon, colors.yellow) + " " + c(text, colors.yellow));
}

// ============================================================================
// Display Functions
// ============================================================================

function showIntro() {
  console.log(
    c(
      "┌─ INFORMATION ─────────────────────────────────────────┐",
      colors.magenta,
    ),
  );
  console.log(
    c("│", colors.magenta) + " Common scenarios when you need this tool:",
  );
  console.log(
    c("│", colors.magenta) +
      " 1. Port 8087 already in use error during development",
  );
  console.log(
    c("│", colors.magenta) +
      " 2. Spring Boot application didn't shutdown properly",
  );
  console.log(
    c("│", colors.magenta) + " 3. Multiple instances running on same port",
  );
  console.log(
    c("│", colors.magenta) +
      " 4. Clean up ports before starting new server instances",
  );
  console.log(
    c(
      "└───────────────────────────────────────────────────────┘",
      colors.magenta,
    ),
  );
  console.log("");
}

function showDevInfo() {
  console.log("");
  console.log(
    c("╔═══════════════════════════════════════════════════════╗", colors.cyan),
  );
  console.log(
    c("║", colors.cyan) +
      c(
        "               ✨ DEVELOPER INFORMATION ✨",
        colors.bold + colors.green,
      ),
  );
  console.log(
    c("╠═══════════════════════════════════════════════════════║", colors.cyan),
  );
  console.log(
    c("║", colors.cyan) +
      c(" Developer         Milon Mia", colors.yellow).padEnd(54),
  );
  console.log(
    c("║", colors.cyan) +
      c(" Tool              Port Killer CLI", colors.yellow).padEnd(54),
  );
  console.log(
    c("║", colors.cyan) +
      c(" Version           1.0.0", colors.yellow).padEnd(54),
  );
  console.log(
    c("║", colors.cyan) + c(" License           MIT", colors.yellow).padEnd(54),
  );
  console.log(
    c("║", colors.cyan) +
      c(" GitHub            github.com/devmilon923", colors.green).padEnd(54),
  );
  console.log(
    c("║", colors.cyan) +
      c(" LinkedIn          linkedin.com/in/devmilon", colors.green).padEnd(54),
  );
  console.log(
    c("╚═══════════════════════════════════════════════════════╝", colors.cyan),
  );
  console.log("");
}

function showNotFound(port) {
  console.log("");
  warning(`No process found listening on port ${port}`);
  console.log("");
  console.log(
    c(
      "┌─ TROUBLESHOOTING ─────────────────────────────────────┐",
      colors.yellow,
    ),
  );
  console.log(c("│", colors.yellow) + " Try manually:");
  console.log(c("│", colors.yellow));
  console.log(c("│", colors.yellow) + c(" Windows:", colors.white));
  console.log(c("│", colors.yellow) + "   netstat -ano | findstr :" + port);
  console.log(c("│", colors.yellow) + "   taskkill /PID <PID> /F");
  console.log(c("│", colors.yellow));
  console.log(c("│", colors.yellow) + c(" Linux/macOS:", colors.white));
  console.log(c("│", colors.yellow) + "   lsof -i :" + port);
  console.log(c("│", colors.yellow) + "   sudo fuser -k " + port + "/tcp");
  console.log(
    c(
      "└───────────────────────────────────────────────────────┘",
      colors.yellow,
    ),
  );
}

function showOSMenu() {
  console.log("");
  console.log(
    c("┌─ SELECT YOUR OPERATING SYSTEM ────────────────────────┐", colors.cyan),
  );
  console.log(c("│", colors.blue));
  console.log(c("│", colors.blue) + c("  1) Windows", colors.yellow));
  console.log(c("│", colors.blue) + c("  2) macOS", colors.yellow));
  console.log(c("│", colors.blue) + c("  3) Linux", colors.yellow));
  console.log(c("│", colors.blue));
  console.log(
    c("└───────────────────────────────────────────────────────┘", colors.cyan),
  );
  console.log("");
}

function showProcessInfo(pid, port, name) {
  console.log("");
  console.log(
    c(
      "╔─ PROCESS FOUND ───────────────────────────────────────╗",
      colors.green,
    ),
  );
  console.log(
    c("║", colors.green) + ` PID:          ${String(pid).padEnd(45)}`,
  );
  console.log(
    c("║", colors.green) + ` Port:         ${String(port).padEnd(45)}`,
  );
  console.log(
    c("║", colors.green) + ` Process Name: ${String(name).padEnd(45)}`,
  );
  console.log(
    c(
      "╚───────────────────────────────────────────────────────╝",
      colors.green,
    ),
  );
  console.log("");
}

// ============================================================================
// Windows Functions
// ============================================================================

function findProcessWindows(port) {
  try {
    const output = execSync("netstat -ano", { encoding: "utf-8" });
    const lines = output.split("\n");

    for (const line of lines) {
      if (line.includes(`:${port}`) && line.includes("LISTENING")) {
        const parts = line.trim().split(/\s+/);
        return parts[parts.length - 1];
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

function getProcessNameWindows(pid) {
  try {
    const output = execSync(`tasklist /FI "PID eq ${pid}" /FO table /NH`, {
      encoding: "utf-8",
    }).trim();

    if (output && output.length > 0) {
      return output.split(/\s+/)[0] || "Unknown";
    }
    return "Unknown";
  } catch (e) {
    return "Unknown";
  }
}

function killPortWindows(pid) {
  try {
    execSync(`taskkill /PID ${pid} /F`, { stdio: "pipe" });
    return true;
  } catch (e) {
    return false;
  }
}

// ============================================================================
// Unix (Linux/macOS) Functions
// ============================================================================

function findProcessUnix(port) {
  try {
    const result = execSync(`lsof -ti:${port}`, { encoding: "utf-8" }).trim();
    return result.split("\n")[0];
  } catch (e) {
    return null;
  }
}

function getProcessNameUnix(pid) {
  try {
    return (
      execSync(`ps -p ${pid} -o comm=`, { encoding: "utf-8" }).trim() ||
      "Unknown"
    );
  } catch (e) {
    return "Unknown";
  }
}

function killPortUnix(port) {
  try {
    execSync(`fuser -k ${port}/tcp`, { stdio: "pipe" });
    return true;
  } catch (e1) {
    try {
      execSync(`sudo fuser -k ${port}/tcp`, { stdio: "pipe" });
      return true;
    } catch (e2) {
      return false;
    }
  }
}

// ============================================================================
// User Input
// ============================================================================

function getInput(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function askConfirm(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

// ============================================================================
// OS Selection
// ============================================================================

async function selectOS() {
  let osChoice;

  while (true) {
    showOSMenu();
    osChoice = await getInput(c("Select option (e,g. 1,2,3): ", colors.cyan));

    if (osChoice === "1") {
      success("Windows selected");
      console.log("");
      return "windows";
    } else if (osChoice === "2") {
      success("macOS selected");
      console.log("");
      return "macos";
    } else if (osChoice === "3") {
      success("Linux selected");
      console.log("");
      return "linux";
    } else {
      error("Invalid choice! Please enter 1, 2, or 3.");
      console.log("");
    }
  }
}

// ============================================================================
// Main Logic by OS
// ============================================================================

async function runWindows(port) {
  info(`Searching for processes using port ${port}...`);
  console.log("");

  const pid = findProcessWindows(port);

  if (!pid) {
    showNotFound(port);
    return;
  }

  const name = getProcessNameWindows(pid);
  showProcessInfo(pid, port, name);

  const confirmed = await askConfirm(
    c("Do you want to kill this process? (y/n): ", colors.cyan),
  );

  if (!confirmed) {
    warning("Operation cancelled by user.");
    console.log("");
    return;
  }

  console.log("");
  info("Terminating process...");
  console.log("");

  if (killPortWindows(pid)) {
    success(`Port ${port} has been killed!`);
    console.log("");
    info("You can now start your backend server on this port.");
    showDevInfo();
  } else {
    error(`Failed to kill the port! (PID: ${pid})`);
    console.log("");
    console.log(
      c(
        "┌─ SOLUTION ─────────────────────────────────────────────┐",
        colors.red,
      ),
    );
    console.log(c("│", colors.red) + " Try manually:");
    console.log(c("│", colors.red));
    console.log(
      c("│", colors.red) + c(`  taskkill /PID ${pid} /F`, colors.white),
    );
    console.log(c("│", colors.red));
    console.log(
      c(
        "└────────────────────────────────────────────────────────┘",
        colors.red,
      ),
    );
    console.log("");
  }
}

async function runUnix(port) {
  info(`Searching for processes using port ${port}...`);
  console.log("");

  const pid = findProcessUnix(port);

  if (!pid) {
    showNotFound(port);
    return;
  }

  const name = getProcessNameUnix(pid);
  showProcessInfo(pid, port, name);

  const confirmed = await askConfirm(
    c("Do you want to kill this process? (y/n): ", colors.cyan),
  );

  if (!confirmed) {
    warning("Operation cancelled by user.");
    console.log("");
    return;
  }

  console.log("");
  info("Terminating process...");
  console.log("");

  if (killPortUnix(port)) {
    success(`Port ${port} has been killed!`);
    console.log("");
    info("You can now start your backend server on this port.");
    showDevInfo();
  } else {
    error(`Failed to kill the port! (PID: ${pid})`);
    console.log("");
    console.log(
      c(
        "┌─ SOLUTION ─────────────────────────────────────────────┐",
        colors.red,
      ),
    );
    console.log(c("│", colors.red) + " Try manually:");
    console.log(c("│", colors.red));
    console.log(c("│", colors.red) + c(`  sudo kill -9 ${pid}`, colors.white));
    console.log(
      c("│", colors.red) + c(`  sudo fuser -k ${port}/tcp`, colors.white),
    );
    console.log(c("│", colors.red));
    console.log(
      c(
        "└────────────────────────────────────────────────────────┘",
        colors.red,
      ),
    );
    console.log("");
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  header();
  showIntro();

  // Step 1: Select OS
  const selectedOS = await selectOS();

  // Step 2: Get port
  let portInput = await getInput(
    c("Enter the port number (e.g., 8087): ", colors.cyan),
  );

  if (!portInput.trim()) {
    error("Please enter a port number!");
    console.log("");
    return;
  }

  const port = parseInt(portInput);
  if (isNaN(port) || port < 1 || port > 65535) {
    error("Invalid port number! Port must be between 1 and 65535.");
    console.log("");
    return;
  }

  console.log("");

  // Step 3: Run based on selected OS
  if (selectedOS === "windows") {
    await runWindows(port);
  } else if (selectedOS === "macos" || selectedOS === "linux") {
    await runUnix(port);
  }
}

main().catch((err) => {
  error("Error: " + err.message);
  process.exit(1);
});
