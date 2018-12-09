const js2xmlparser = require("js2xmlparser");
const fs = require("fs");
const path = require("path");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const generateSkin = async () => {
  const script = (await readFile(
    path.resolve(__dirname, "dist/script.js")
  )).toString();

  let wrappers = (await readFile(
    path.resolve(__dirname, "src/wrappers.html")
  )).toString();

  wrappers = wrappers.replace(
    /<!-- EXTRASCRIPT -->/gi,
    `<script type="text/javascript">${script}</script>`
  );

  const stylesheet = (await readFile(
    path.resolve(__dirname, "dist/stylesheet.css")
  )).toString();
  const macros = (await readFile(
    path.resolve(__dirname, "src/macros.html")
  )).toString();

  const skinname = (
    "Looks Like Luigi DEV[" +
    new Date().getTime() / 1000 +
    "]"
  ).replace(/[\s(),:;~+\-_]/g, "");

  const skin = {
    skinname: skinname,
    date: new Date().toUTCString(),
    stylesheet: stylesheet,
    wrappers: wrappers,
    macros: macros,
    templates: "" // Empty for now, may do some custom HTML later
  };

  fs.writeFileSync(
    path.resolve(__dirname, "dist/output.xml"),
    js2xmlparser
      .parse("skin", skin, {
        cdataInvalidChars: true,
        format: {
          doubleQuotes: true,
          pretty: true
        }
      })
      .replace(/<!\[CDATA\[/g, "") // strip CDATA tags that js2xml adds
      .replace(/\]\]>/g, "") // strip CDATA tags that js2xml adds
  );
};

generateSkin();
