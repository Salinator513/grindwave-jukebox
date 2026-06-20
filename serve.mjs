// Tiny zero-dependency static server for the GRINDWAVE pixel-radio player.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const root = path.dirname(url.fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 4317;
const types = {
  ".html":"text/html; charset=utf-8", ".js":"text/javascript", ".css":"text/css",
  ".json":"application/json", ".wav":"audio/wav", ".png":"image/png", ".svg":"image/svg+xml",
};

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || "/").split("?")[0]);
  if (p === "/") p = "/index.html";
  const fp = path.normalize(path.join(root, p));
  if (!fp.startsWith(root)) { res.writeHead(403); res.end("forbidden"); return; }
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end("not found"); return; }
    res.writeHead(200, { "content-type": types[path.extname(fp)] || "application/octet-stream", "cache-control": "no-store" });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => console.log(`GRINDWAVE pixel radio → http://127.0.0.1:${port}`));
