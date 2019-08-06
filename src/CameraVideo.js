import { connection as AyameConnection } from "@open-ayame/ayame-web-sdk";

class CameraVideo extends HTMLElement {
  constructor() {
    super();
    this.conn = AyameConnection(
      "wss://ayame.shiguredo.jp/ws",
      "miyamo-test-room"
    );
    this.localVideo = createVideo();
    this.remoteVideo = createVideo();

    this.conn.on("connect", e => {
      console.log("connect", e);
    });
    this.conn.on("disconnect", e => {
      console.log("disconnect", e);
      this.localVideo.srcObject = null;
      this.remoteVideo.srcObject = null;
    });
    this.conn.on("addstream", e => {
      console.log("addstream", e);
      this.remoteVideo.srcObject = e.stream;
    });
    this.conn.on("removestream", e => {
      console.log("removestream", e);
    });
  }
  connectedCallback() {
    this.addEventListener("click", e => {
      if (this.conn._pc) {
        this.conn.disconnect();
        this.localVideo.srcObject = null;
        this.remoteVideo.srcObject = null;
      } else {
        const startConn = async () => {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
          });
          const stream = await this.conn.connect(mediaStream);
          this.localVideo.srcObject = stream;
        };
        startConn();
      }
    });

    this.appendChild(this.localVideo);
    this.appendChild(this.remoteVideo);
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

function createVideo() {
  const video = document.createElement("video");
  video.playsinline = true;
  video.muted = true;
  video.mute = true;
  video.autoplay = true;
  video.poster = "/img/camera_play.svg";
  video.style.width = "40%";
  return video;
}

export default {
  setup() {
    customElements.define("camera-video", CameraVideo);
  }
};
