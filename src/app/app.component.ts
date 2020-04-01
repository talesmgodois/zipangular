import { Component } from "@angular/core";
import { saveAs } from "file-saver";
import axios from "axios";
import * as JSZip from "jszip";
import * as JSZipUtils from "jszip-utils";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  downloadLink = "";
  urls = [
    "https://cloud.getjus.com.br/index.php/s/3b7t7rnXZcatkzr/download",
    "https://cloud.getjus.com.br/index.php/s/jLMwRBb6Dcsji7M/download"
  ];

  async downloadZip2(urls: Array<string>, name = "zipFile", type = "pdf") {
    const zip = new JSZip();
    const zipFilename = `${name}.zip`;
    let count = 0;
    let axs = [];

    urls.forEach(function(url) {
      console.log(url);
      const filename = `filename-${count}.${type}`;
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function(err, data) {
        if (err) {
          throw err; // or handle the error
        }
        console.log(data);
        zip.file(filename, data, { binary: true });
        count++;
        if (count === urls.length) {
          zip.generateAsync({ type: "blob" }).then(function(content) {
            saveAs(content, zipFilename);
          });
        }
      });
    });
  }

  async downloadZip(urls: Array<string>, name = "zipFile", type = "pdf") {
    const zip = new JSZip();
    const zipFilename = `${name}.zip`;
    let count = 0;
    let axs = [];
    for (let i = 0; i < urls.length; i++) {
      const ax = await axios.get(urls[i], {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
        }
      });
      axs.push(ax);
    }

    console.log(axs);

    urls.forEach(function(url) {
      console.log(url);
      const filename = `filename-${count}.${type}`;
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function(err, data) {
        if (err) {
          console.log(err);
          throw err; // or handle the error
        }
        console.log(data);
        zip.file(filename, data, { binary: true });
        count++;
        if (count === urls.length) {
          zip.generateAsync({ type: "blob" }).then(function(content) {
            saveAs(content, zipFilename);
          });
        }
      });
    });
  }

  download() {
    return this.downloadZip(this.urls, "getjus");
  }
}
