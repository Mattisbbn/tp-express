import http from "http";
import url from "url";
import fs from "fs";

import ejs from "ejs";

const htmlTest = fs.readFileSync("./test.html");

const server = http.createServer();

server.listen(8000, "localhost");
server.on("listening", () => console.log("Serveur démarré !"));
server.on("request", (request, response) => {
  const requestedUrl = new URL(request.url, `http://${request.headers.host}`);
  const uri = requestedUrl.pathname;

  switch (uri) {
    case "/1":
      response.end("1");
      break;
    case "/html":
      response.end(htmlTest);
      break;
    case "/htmlejs":
      const isAdmin = requestedUrl.searchParams.get("isadmin") === "true";

      if(isAdmin){}
      ejs.renderFile("./pages/index.ejs", {name:'Mattis'}, (err, str) => {
        response.end(str);
      });



      break;
    default:
      response.writeHead(404);
      response.end("");
      break;
  }
});
