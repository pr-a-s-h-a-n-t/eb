import React, { useEffect, useState } from "react";
// import "./styles.css";
import grapesjs from "grapesjs";
import newsletterPlugin from "grapesjs-preset-newsletter";
import { makeStyles } from "@material-ui/core";
import "grapesjs/dist/css/grapes.min.css";

const useStyles = makeStyles({
  gjsWrap: {
    height: "500px !important",
    border: "5px solid #444",
  },
});

const template = `
    <div id="previewTextContainer" style="display: none;">PREVIEW TEXT</div>
    <div style="height: 100%; width: 100%;">
    <table id="ii8y"><tbody>
    <tr>
        <td id="iegs"></td>
        <td id="io1y"></td>
    </tr>
    </tbody></table></div> 
    `;

export default function App() {
  const classes = useStyles();
  const [save, setSave] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // Set up GrapesJS editor with the Newsletter plugin
    const editor = grapesjs.init({
      height: "100%",
      exportWrapper: true,
      // storageManager: {
      //   autoload: 0
      // },
      assetManager: {
        assets: "",
        autoAdd: 1,
        headers: {},
        handleAdd: () => {
          alert("this feature is disabled");
        },
        showUrlInput: false,
      },
      richTextEditor: {},
      container: "#gjs",
      components: template,
      plugins: [newsletterPlugin],
      pluginsOpts: {
        "gjs-preset-newsletter": {
          modalTitleImport: "Import Template",
          modalLabelImport: "Paste all your code here below and click import",
          modalLabelExport: "Copy the code and use it wherever you want",
          modalBtnImport: "Import Template",
          codeViewerTheme: "material",
          cellStyle: {
            "font-size": "12px",
            "font-weight": 300,
            "vertical-align": "top",
            color: "rgb(111, 119, 125)",
            margin: 0,
            padding: 0,
          },
        },
      },
      storageManager: {
        type: "remote",
        autoload: true,
        stepsBeforeSave: 1,
        contentTypeJson: true,
        urlStore:
          "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=html",
        urlLoad:
          "https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=html",
        // For custom parameters/headers on requests
        params: {
          _some_token: "CST",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic ...",
        },
        json_encode: {
          "gjs-components": [],
          "gjs-style": [],
        },
      },
      showDevices: false,
    });

    // window.editor = editor;

    const styleManager = editor.StyleManager;
    const fontProperty = styleManager.getProperty("typography", "font-family");
    // fontProperty.addOption({value: "sans-serif", name: 'sans-serif'}),

    // console.log("fontProperty =->", fontProperty);
    fontProperty.addOption({ value: "sans-serif", name: "sans-serif" });
    styleManager.render();

    // grab the instance of the rich text editor =>
    const rte = editor.RichTextEditor;

    // we don't like the stock behavior of the link button in the built-in RTE
    rte.remove("link");

    // A simple way to change font-size from the rich text editor...
    rte.add("fontSize", {
      attributes: {
        title: "font size",
      },
      icon: `<select class="gjs-field">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
        </select><div>&nbsp;&nbsp;Text Size</div>`,
      // Bind the 'result' on 'change' listener
      event: "change",
      result: (rte, action) =>
        rte.exec("fontSize", action.btn.firstChild.value),
      // Callback on any input change (mousedown, keydown, etc..)
      update: (rte, action) => {
        const value = rte.doc.queryCommandValue(action.name);
        if (value !== "false") {
          // value is a string
          action.btn.firstChild.value = value;
        }
      },
    });

    // example of manipulating the elements...
    // everything is a string...
    editor.on("component:selected", () => {
      // console.log("selected ==>", editor.getHtml());
      const theHtml = editor.getHtml();
      const el = document.createElement("span");

      // convert to js object so we can work with it easier
      el.innerHTML = theHtml;

      const previewContainer = el.querySelector("#previewTextContainer");
      const wrappedHTML = `<div style="height: 100%; width: 100%; background-color: red;">${el.innerHTML}</div>`;
      // console.log("el.innerHtml", el.outerHTML, theHtml);
      console.log("Preview Container ==>", previewContainer);
      console.log("wrappedHTML ==>", wrappedHTML);
    });
    console.log("save in effect", save);
    if (save) {
      console.log("in save fara false");
      editor.store((res) => console.log("Store callback", res));
    }

    if (load) {
      console.log("load template from file");
      const template = `<body style="box-sizing: border-box; margin: 0;">
        <div id="previewTextContainer" style="box-sizing: border-box; display: none;">PREVIEW TEXT
        </div>
        <div id="ijbb" style="box-sizing: border-box; height: 100%; width: 100%;">
            <table id="ii8y" style="box-sizing: border-box;">
            <tbody style="box-sizing: border-box;">
                <tr style="box-sizing: border-box;">
                <td id="iegs" style="box-sizing: border-box;">
                </td>
                <td id="io1y" style="box-sizing: border-box;">
                </td>
                </tr>
            </tbody>
            </table>
            <div id="ivvig" style="box-sizing: border-box; padding: 10px;">Insert your text here
            </div>
        </div>
        <a class="button" style="box-sizing: border-box;">Button</a>
        </body>`;
      editor.load((template) => {
        console.log("template loaded", template);
        setLoad(false);
      });
    }
  }, [save, load]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      {/* <h1>Basic GrapesJS Setup</h1>
            <h2>Inside a React App</h2> */}
      <button onClick={() => setSave(true)}>Save Template</button>
      <button onClick={() => setLoad(true)}>Load Template from file</button>
      {/* <input
            type="file"
            id="fileElem"
            multiple
            accept="image/*"
            css={"display:none"}
        /> */}
      {/* <button id="fileSelect">Load template from file</button> */}
      <div className={classes.gjsWrap}>
        <div id="gjs"></div>
      </div>
    </div>
  );
}
