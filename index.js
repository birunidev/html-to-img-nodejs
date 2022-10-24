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
app.get("/", (req, res) => {
  return res.json({ status: "oke" });
});
app.post("/html2img", async (req, res) => {
  if (!req.body.html_code) {
    return res.json({
      status: "error",
      message: "html_code is required",
    });
  }

  if (!req.body.content) {
    return res.json({
      status: "error",
      message: "content is required",
    });
  }

  try {
    const image = await nodeHtmlToImage({
      html: req.body.html_code,
      content: req.body.content || {},
      puppeteerArgs: { args: ["--no-sandbox"] },
    });
    const finalImage = `${dataImagePrefix}${image.toString("base64")}`;

    res.json({ result: finalImage });
  } catch (error) {
    res.json({
      result: null,
      status: "error",
      message: error.message,
    });
  }
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App is listening to PORT: http://localhost:${PORT}`);
});
