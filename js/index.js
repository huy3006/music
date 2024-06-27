const player = document.getElementById("player");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const progressMusic = document.getElementById("progress-music");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const songList = document.getElementsByClassName("song-list")[0];
const infoSong = document.getElementsByClassName("info-song")[0];
var indexCurrentSong = 0;

const app = {
  listSong: [
    {
      imagePath: "./image/son-tung-mtp.jpg",
      songName: "Nơi này có anh nhé",
      singerName: "Sơn Tùng MTP",
      songPath: "./music/noi-nay-co-anh.mp3",
    },
    {
      imagePath: "./image/tien-tien.jpg",
      songName: "Vì tôi còn sống",
      singerName: "Tiên Tiên",
      songPath: "./music/vi-toi-con-song.mp3",
    },
    {
      imagePath: "./image/tien-tien.jpg",
      songName: "Chuyện nhà bé thôi con đừng về",
      singerName: "Tiên Tiên",
      songPath: "./music/chuyen-nha-be-thoi-con-dung-ve.mp3",
    },
  ],
  start: function () {
    this.loadSong(this.listSong[0].songPath);
    this.loadInfoSong(this.listSong[0]);
    this.playAudio();

    player.ontimeupdate = () => {
      progressMusic.value = player.currentTime;
      progressMusic.min = 0;
      progressMusic.max = player.duration;
      currentTime.textContent = this.convertTime(player.currentTime) ?? '';
      totalTime.textContent = this.convertTime(player.duration) ?? '';

      if (player.currentTime == player.duration) {
        this.showHidePauseOrPlayBtn("pause");
      }
    };
  },
  loadSong: function (songPath) {
    player.src = songPath;
  },
  loadInfoSong: function (infomationSong) {
    infoSong.innerHTML = `<div class="image">
            <img
              class="image-thumb"
              src="${infomationSong.imagePath}"
              alt=""
              srcset=""
            />
          </div>
          <div class="singer-name">
            <span>${infomationSong.singerName}</span>
          </div> 
          <div class="song-name">
            <span>${infomationSong.songName}</span>
          </div>`;
  },
  renderSongList: function () {
    let content = '';
    this.listSong.map((item, index) => {
      content += `<div class="song-list-item cusor-pointer" onclick="app.selectSong(${index})">
            <div class="image-song-list">
              <img class="image-item" src="${item.imagePath}" alt="" srcset="">
            </div>
            <div class="info-song">
              <span class="name">
              ${item.songName}
              </span><br>
              <span class="singer">
              ${item.singerName}
              </span>
            </div>
          </div>`;
    });
    
    songList.innerHTML = content;
    
  },
  convertTime: function (time) {
    if (!time) return '00:00';

    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);

    if (mins < 10) {
      mins = "0" + String(mins);
    }
    if (secs < 10) {
      secs = "0" + String(secs);
    }

    return mins + ":" + secs;
  },
  playAudio: function () {
    player.play();
    this.showHidePauseOrPlayBtn("play");
  },
  pauseAudio: function () {
    player.pause();
    this.showHidePauseOrPlayBtn("pause");
  },
  refreshAudio: function () {
    player.currentTime = 0;
    this.showHidePauseOrPlayBtn("play");
  },
  progressOnClick: function (valueProgress) {
    player.currentTime = valueProgress;
    progressMusic.value = valueProgress;
    this.playAudio();
  },
  showHidePauseOrPlayBtn: function (action) {
    if (action == "play") {
      pauseBtn.style.display = "block";
      playBtn.style.display = "none";
    }
    if (action == "pause") {
      pauseBtn.style.display = "none";
      playBtn.style.display = "block";
    }
  },
  selectSong: function (index) {
    indexCurrentSong = index;
    this.loadSong(this.listSong[index].songPath);
    this.loadInfoSong(this.listSong[index]);
    player.play();
  },
  backOrNextSong: function (action) {
    if (action == 'back' && indexCurrentSong > 0) {
      indexCurrentSong--;
    }
    if (action == 'next' && indexCurrentSong < this.listSong.length - 1) {
      indexCurrentSong++;
    }
    this.selectSong(indexCurrentSong);
  },
  createHeart: function () {
    const para = document.createElement("span");
    para.innerText = "❤️";
    para.classList.add("heart");
    let widthWindow = window.screen.width;
    let marginLeft = Math.random() * widthWindow
    para.style.left = marginLeft + 'px';
    document.body.appendChild(para);

    setTimeout(() => {
      document.body.removeChild(para);
    }, 7000)
  }
};

app.start();
app.renderSongList();

const heartInterval = setInterval(() => app.createHeart(), 200);
