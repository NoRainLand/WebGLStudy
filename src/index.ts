import { GameEntry } from "./GameEntry.js";
import { MainGame } from "./MainGame.js";

export class index {
    constructor() {
        GameEntry.init();
        this.init();
    }

    private btnPause: HTMLButtonElement;
    private btnPlay: HTMLButtonElement;
    private btnReflush: HTMLButtonElement;
    private FPS: HTMLPreElement;
    private btnDownload: HTMLButtonElement;

    private mainGame: MainGame;

    init() {

        this.btnPause = document.getElementById('btnPause') as HTMLButtonElement;
        this.btnPlay = document.getElementById('btnPlay') as HTMLButtonElement;
        this.btnReflush = document.getElementById('btnReflush') as HTMLButtonElement;
        this.FPS = document.getElementById('FPS') as HTMLPreElement;
        this.btnDownload = document.getElementById("btnDownload") as HTMLButtonElement;


        this.btnPlay.style.display = 'none';
        this.btnPause.style.display = 'block';

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {

            }
        })

        this.addEvent();
        window["mainGame"] = this.mainGame = new MainGame();

        this.update();
    }


    update = () => {
        this.FPS.innerText = this.mainGame.FPS.toString();
        requestAnimationFrame(this.update);
    }

    private addEvent() {
        this.btnPause.addEventListener('click', () => {
            this.mainGame.pause();
            this.btnPause.style.display = 'none';
            this.btnPlay.style.display = 'block';
        })
        this.btnPlay.addEventListener('click', () => {
            this.mainGame.play();
            this.btnPlay.style.display = 'none';
            this.btnPause.style.display = 'block';
        })
        this.btnReflush.addEventListener('click', () => {
            window.location.reload();
        })

        this.btnDownload.addEventListener("click",()=>{
            this.mainGame.download();
        })
    }
}

new index();