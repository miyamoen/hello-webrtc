import CameraVideo from "./CameraVideo";

CameraVideo.setup();

const app = window.Elm.Main.init({
  flags: {},
  node: document.getElementById("elm"),
});

const log = e => console.log(e) && e;
