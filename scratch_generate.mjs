import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

// Polyfill FileReader for Node.js environment
class MockFileReader {
  constructor() {
    this._onload = null;
    this._onerror = null;
    this._onloadend = null;
    this.result = null;
    console.log("MockFileReader instantiated");
  }

  get onload() { return this._onload; }
  set onload(val) {
    console.log("MockFileReader.onload set to:", val ? "function" : val);
    this._onload = val;
  }

  get onerror() { return this._onerror; }
  set onerror(val) {
    console.log("MockFileReader.onerror set to:", val ? "function" : val);
    this._onerror = val;
  }

  get onloadend() { return this._onloadend; }
  set onloadend(val) {
    console.log("MockFileReader.onloadend set to:", val ? "function" : val);
    this._onloadend = val;
  }

  readAsDataURL(blob) {
    console.log("FileReader.readAsDataURL called with blob of size:", blob.size);
    setTimeout(() => {
      blob.arrayBuffer().then(buf => {
        const base64 = Buffer.from(buf).toString('base64');
        this.result = `data:${blob.type};base64,${base64}`;
        console.log("FileReader.readAsDataURL finished, calling onload/onloadend");
        if (this._onload) this._onload({ target: this });
        if (this._onloadend) this._onloadend({ target: this });
      }).catch(err => {
        console.error("FileReader.readAsDataURL error:", err);
        if (this._onerror) this._onerror(err);
      });
    }, 10);
  }

  readAsArrayBuffer(blob) {
    console.log("FileReader.readAsArrayBuffer called with blob of size:", blob.size);
    setTimeout(() => {
      blob.arrayBuffer().then(buf => {
        console.log("FileReader.readAsArrayBuffer promise resolved");
        this.result = buf;
        if (this._onload) {
          console.log("Calling onload callback");
          this._onload({ target: this });
        }
        if (this._onloadend) {
          console.log("Calling onloadend callback");
          this._onloadend({ target: this });
        }
        if (!this._onload && !this._onloadend) {
          console.warn("Neither onload nor onloadend is defined!");
        }
      }).catch(err => {
        console.error("FileReader.readAsArrayBuffer error:", err);
        if (this._onerror) this._onerror(err);
      });
    }, 10);
  }
}
global.FileReader = MockFileReader;

const assetsDir = path.resolve('public/assets/scene-02');

// Create directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const exporter = new GLTFExporter();

function exportMesh(mesh, filename) {
  const outputPath = path.join(assetsDir, filename);
  return new Promise((resolve, reject) => {
    console.log("Calling exporter.parse...");
    exporter.parse(
      mesh,
      (result) => {
        try {
          console.log("exporter.parse callback triggered successfully!");
          fs.writeFileSync(outputPath, Buffer.from(result));
          console.log(`Successfully generated ${filename}`);
          resolve();
        } catch (e) {
          console.error("Error in success callback:", e);
          reject(e);
        }
      },
      (error) => {
        console.error(`Error exporting ${filename}:`, error);
        reject(error);
      },
      { binary: true }
    );
  });
}

// Create MainDisplay device group representing the bezel and screen surface
const displayGroup = new THREE.Group();

// Display bezel/body mesh
const bodyGeo = new THREE.BoxGeometry(4, 3, 0.3);
const bodyMat = new THREE.MeshStandardMaterial({
  color: 0x0B0F14,
  metalness: 0.8,
  roughness: 0.3
});
const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
bodyMesh.name = "display_body";
displayGroup.add(bodyMesh);

// Screen surface mesh
const screenGeo = new THREE.PlaneGeometry(3.6, 2.6);
const screenMat = new THREE.MeshStandardMaterial({
  color: 0x05070A,
  emissive: 0x081A2A,
  emissiveIntensity: 0.2,
  transparent: true,
  opacity: 0.8
});
const screenMesh = new THREE.Mesh(screenGeo, screenMat);
screenMesh.name = "screen_surface";
screenMesh.position.z = 0.16; // Offset slightly forward to rest on the bezel frame
displayGroup.add(screenMesh);

console.log("Starting export...");
await exportMesh(displayGroup, 'mainDisplay.glb');
console.log("Export complete.");
