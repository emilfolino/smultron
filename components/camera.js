import { uploadCareKey } from "../utils.js";
import { UploadClient } from "../uploadcare/index.browser.min.js";

export default class CameraComponent extends HTMLElement {
    constructor() {
        super();

        this.photoData = "";
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="camera">
        <video playsinline id="video">Video stream not available.</video>
        <button id="startbutton">Take photo</button>
        <button id="sendbutton">Send photo</button>
        </div>
        <canvas id="canvas"></canvas>
        `;

        this.startup();
    }

    async startup() {
        let streaming = false;
        const width = 320; // We will scale the photo width to this
        let height = 0; // This will be computed based on the input stream

        let video = document.getElementById("video");
        let canvas = document.getElementById("canvas");
        let startbutton = document.getElementById("startbutton");
        let sendbutton = document.getElementById("sendbutton");

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        video.srcObject = stream;
        video.play();

        video.addEventListener(
            "canplay",
            () => {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    streaming = true;
                }
            },
            false
        );

        startbutton.addEventListener(
            "click",
            (ev) => {
                ev.preventDefault();
                this.takepicture(canvas, video, width, height);
            },
            false
        );

        sendbutton.addEventListener(
            "click",
            (ev) => {
                ev.preventDefault();
                this.sendpicture();
            },
            false
        );

        this.clearphoto(canvas);
    }

    takepicture(canvas, video, width, height) {
        const context = canvas.getContext("2d");

        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            this.photoData = canvas.toDataURL("image/png");
        } else {
            this.clearphoto(canvas);
        }
    }

    clearphoto(canvas) {
        const context = canvas.getContext("2d");

        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.photoData = canvas.toDataURL("image/png");
    }

    async sendpicture() {
        console.log("send");
        const blob = await (await fetch(this.photoData)).blob();

        const client = new UploadClient({ publicKey: uploadCareKey });

        const fileInfo = await client.uploadFile(blob);
        const cdnUrl = fileInfo.cdnUrl;

        let hiddenUrl = document.getElementById("hidden-url");

        hiddenUrl.value = cdnUrl;
    }
}
