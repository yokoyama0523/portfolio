import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");

const patterns = [
  {
    label: "home folder path",
    regex: String.raw`(/Users/|/home/)[A-Za-z0-9._-]+/|[A-Za-z]:\\Users\\`,
  },
  {
    label: "personal email address",
    regex: String.raw`[A-Za-z0-9._%+-]+@(outlook|icloud|gmail|yahoo|hotmail|live|me)\.(com|co\.jp|jp|ne\.jp)`,
  },
  {
    label: "local network address",
    regex: String.raw`(127\.0\.0\.1|localhost:[0-9]+|192\.168\.[0-9]+\.[0-9]+)`,
  },
];

const find = (regex: string) => {
  try {
    return execFileSync("git", ["grep", "-I", "-n", "-E", regex], {
      cwd: root,
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
};

const found = patterns
  .map(({ label, regex }) => ({ label, hits: find(regex) }))
  .filter(({ hits }) => hits !== "");

for (const { label, hits } of found) console.error(`${label}:\n${hits}\n`);
if (found.length > 0) process.exit(1);
console.log("check-private: no local paths, personal emails or local addresses in tracked files");
