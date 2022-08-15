const express = require("express");
const nodeHtmlToImage = require("node-html-to-image");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4400;

const dataImagePrefix = `data:image/png;base64,`;

/*

method: POST
route: /img2html
body: {
    "certificate_bg": "url",
    "certificate_values": {
        "name": "Muhammad Al Biruni",
        "status": "Peserta"
    }
}

*/
app.post("/html2img", async (req, res) => {
  const image = await nodeHtmlToImage({
    html: req.body.html_code,
    content: req.body.content || {},
  });
  const finalImage = `${dataImagePrefix}${image.toString("base64")}`;

  res.json({ result: finalImage });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App is listening to PORT: http://localhost:${PORT}`);
});
