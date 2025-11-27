const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const port = process.env.PORT || 5173;
const publicDir = path.join(__dirname, "..", "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf"
};

function serveFile(res, filePath) {
  fs.stat(filePath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    fs.createReadStream(filePath)
      .on("error", () => {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("500 Internal Server Error");
      })
      .pipe(res.writeHead(200, { "Content-Type": contentType }));
  });
}

function requestHandler(req, res) {
  const parsedUrl = url.parse(req.url);
  const safePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[/\\])+/, "");
  let targetPath = path.join(publicDir, safePath);

  fs.stat(targetPath, (err, stats) => {
    if (err) {
      // Fallback to index.html for missing root route
      const fallback = path.join(publicDir, "index.html");
      serveFile(res, fallback);
      return;
    }

    if (stats.isDirectory()) {
      targetPath = path.join(targetPath, "index.html");
    }

    serveFile(res, targetPath);
  });
}

http
  .createServer(requestHandler)
  .listen(port, () => {
    console.log(`Static server running at http://localhost:${port}`);
    console.log(`Serving files from: ${publicDir}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
