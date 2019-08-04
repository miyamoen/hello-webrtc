import { connection as AyameConnection } from "@open-ayame/ayame-web-sdk";

class CameraVideo extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const localVideo = createVideo();
    const remoteVideo = createVideo();

    this.addEventListener("click", e => {
      if (this.conn && this.conn.stream.active) {
        this.conn.stream.getTracks().forEach(track => track.stop());
        this.conn._ws.close();
        localVideo.srcObject = null;
        this.conn = null;
      } else {
        this.conn = AyameConnection(
          "wss://ayame.shiguredo.jp/ws",
          "miyamo-test-room",
        );
        const startConn = async () => {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
          });
          const stream = await this.conn.connect(mediaStream);
          this.conn.on("disconnect", e => {
            console.log(e);
            remoteVideo.srcObject = null;
          });
          this.conn.on("addstream", e => {
            remoteVideo.srcObject = e.stream;
          });
          localVideo.srcObject = stream;
        };
        startConn();
      }
    });

    this.localVideo = localVideo;
    this.remoteVideo = remoteVideo;
    this.appendChild(localVideo);
    this.appendChild(remoteVideo);
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
  },
};
