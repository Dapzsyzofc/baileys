"use strict";

const chalk = require("chalk");
const gradient = require("gradient-string");

console.log();
console.log(chalk.magentaBright(`
╔════════━━━━⌜ DAPZSYZ BAILEYS MOD ⌟━━━━══════════╗
║ hi everyone, thank you for using baileys DapzSYZ
╚═════════════════════════════════════════════════╝
`));

console.log(chalk.magentaBright("  YouTube: ") + chalk.redBright("DapzSYZOfficial"));
console.log(chalk.magenta(`\n My regards, DapzSYZ Official\n`));

import makeWASocket from "./Socket/index.js";
//=======================================================//
export * from "./Defaults/index.js";
export * from "./WABinary/index.js";
export * from "../WAProto/index.js";
export * from "./WAUSync/index.js";
export * from "./Store/index.js";
export * from "./Utils/index.js";
export * from "./Types/index.js";
export * from "./WAM/index.js";
//=======================================================//
export { makeWASocket };
export default makeWASocket;
//=======================================================//