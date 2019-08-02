class CameraVideo extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const video = document.createElement("video");
    video.playsinline = true;
    video.muted = true;
    video.mute = true;
    video.autoplay = true;
    video.poster = "/img/camera_play.svg";
    video.style.width = "100%";

    video.addEventListener("click", e => {
      console.log("click", e);
      if (this.mediaStream && this.mediaStream.active) {
        this.mediaStream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      } else {
        navigator.mediaDevices
          .getUserMedia({ audio: false, video: true })
          .then(mediaStream => {
            window.ms = mediaStream;
            this.mediaStream = mediaStream;
            video.srcObject = mediaStream;
          })
          .catch(err => console.log(err));
      }
    });

    this.video = video;
    this.appendChild(video);
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

export default {
  setup() {
    customElements.define("camera-video", CameraVideo);
  },
};
