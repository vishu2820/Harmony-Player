const music = new Audio();
const songs = [
    {
        id: 1,
        title: 'Fade',
        artist: 'Alan Walker',
        file: 'audio/1.mp3',
        poster: 'images/1.png'
    },
    {
        id: 2,
        title: 'Main Hoon Hero Tera',
        artist: 'Salman Khan',
        file: 'audio/2.mp3',
        poster: 'images/2.png'
    },
    {
        id: 3,
        title: 'Aaj Dil Shayarana',
        artist: 'Shafaqat Amanat Ali',
        file: 'audio/3.mp3',
        poster: 'images/3.png'
    },
    {
        id: 4,
        title: 'Teri Jhuki NAzar',
        artist: 'Shafaqat Amanat Ali',
        file: 'audio/4.mp3',
        poster: 'images/4.png'
    },
    {
        id: 5,
        title: 'Tum Hi Ho',
        artist: 'Arijit Singh',
        file: 'audio/5.mp3',
        poster: 'images/5.png'
    },
    {
        id: 6,
        title: 'Ik Vaari Aa',
        artist: 'Arijit Singh,Pritam',
        file: 'audio/6.mp3',
        poster: 'images/6.png'
    },
    {
        id: 7,
        title: 'Sanam Re',
        artist: 'Arijit Singh',
        file: 'audio/7.mp3',
        poster: 'images/7.png'
    },
    {
        id: 8,
        title: 'Tu Hai Ki Nahi',
        artist: 'Ankit Tiwari',
        file: 'audio/8.mp3',
        poster: 'images/8.png'
    },
    {
        id: 9,
        title: 'All Black',
        artist: 'Raftaar, Sukh-E Musical Doctorz',
        file: 'audio/9.mp3',
        poster: 'images/9.png'
    },
    {
        id: 10,
        title: 'Hai Dil Ye Mera',
        artist: 'Arijit Singh',
        file: 'audio/10.mp3',
        poster: 'images/10.png'
    },
    {
        id: 11,
        title: 'Main Woh Chaand',
        artist: 'Darshan Raval',
        file: 'audio/11.mp3',
        poster: 'images/11.png'
    },
    {
        id: 12,
        title: '01.Galliyan Teri Galliyan',
        artist: 'Ankit Tiwari',
        file: 'audio/12.mp3',
        poster: 'images/12.png'
    },
    {
        id: 13,
        title: 'Baarish',
        artist: 'Mohammed Irfan & Gajendra Verma',
        file: 'audio/13.mp3',
        poster: 'images/13.png'
    },
    {
        id: 14,
        title: 'Blue Eyes',
        artist: 'Yo Yo Honey Singh',
        file: 'audio/14.mp3',
        poster: 'images/14.png'
    },
    {
        id: 15,
        title: 'Banjaara',
        artist: 'Mohammed Irfan',
        file: 'audio/7.mp3',
        poster: 'images/7.png'
    },
    {
        id: 16,
        title: 'Tanning-(HeroMaza.in)',
        artist: 'HeroMaza.in',
        file: 'audio/16.mp3',
        poster: 'images/16.png'
    },
];

function updateUI(index) {
    const currentSong = songs[index - 1];
    document.getElementById('poster_master_play').src = currentSong.poster;
    document.getElementById('title').innerHTML = `<p>${currentSong.title}</p><div class="subtitle">${currentSong.artist}</div>`;
}

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('playlistPlay')) {
        const index = parseInt(e.target.id);
        handlePlayPause(index);
        updateUI(index);
    }

    if (e.target.id === 'back') {
        handleNavigation('back');
    }

    if (e.target.id === 'next') {
        handleNavigation('next');
    }
});

function handlePlayPause(index) {
    if (music.paused || music.currentTime <= 0) {
        playSong(index);
    } else {
        pauseSong();
    }
}

function playSong(index) {
    const song = songs[index - 1];
    music.src = song.file;
    music.play();
}

function pauseSong() {
    music.pause();
}

function handleNavigation(direction) {
    let index = parseInt(music.src.split('/').pop().split('.')[0]);
    if (direction === 'back') {
        index = (index - 2 + songs.length) % songs.length;
    } else {
        index = (index % songs.length);
    }
    playSong(index + 1);
    updateUI(index + 1);
}
let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener("click", () => {
    if(music.paused || music.currentTime <= 0){
        music.play();
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add('active2');
    } else{
        music.pause();
        masterPlay.classList.add("bi-play-fill");
        masterPlay.classList.remove("bi-pause-fill");
        wave.classList.remove('active2');
    }
})

const pauseAllSongs = () => {
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
            element.classList.add("bi-play-circle-fill");
            element.classList.remove("bi-pause-circle-fill");
    })    
}
const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
            element.style.background = "rgba(105, 105, 105, 0)";
    })    
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
    element.addEventListener("click", (e) =>{
        index = e.target.id;
        pauseAllSongs();
        e.target.classList.remove("bi-play-circle-fill");
        e.target.classList.add("bi-pause-circle-fill");
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `images/${index}.png`; 
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add('active2');
        music.addEventListener("ended", () => {
            masterPlay.classList.add("bi-play-fill");
            masterPlay.classList.remove("bi-pause-fill");
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgba(105, 105, 105, .1)";
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener("timeupdate", () => {
    let music_current = music.currentTime;
    let music_duration = music.duration;

    let min = Math.floor(music_current/60);
    let sec = Math.floor(music_current%60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    currentStart.innerHTML = `${min}:${sec}`;


    let min2 = Math.floor(music_duration/60);
    let sec2 = Math.floor(music_duration%60);
    if(sec2 < 10){
        sec2 = `0${sec2}`;
    }
    currentEnd.innerHTML = `${min2}:${sec2}`;



    let progressBar = parseInt((music.currentTime/music.duration) * 100);
    seek.value = progressBar;
    let seekBar = seek.value;
    bar2.style.width = `${seekBar}%`;
    dot.style.left = `${seekBar}%`;
})

seek.addEventListener('change', () =>{
    music.currentTime = seek.value * music.duration /100;
})
let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }

    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `images/${index}.png`; 
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
    })
    pauseAllSongs();
    document.getElementById(`${index}`).classList.remove("bi-play-fill");
    document.getElementById(`${index}`).classList.add("bi-pause-fill");
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgba(105, 105, 105, .1)";
})


next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }

    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `images/${index}.png`; 
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
    })
    pauseAllSongs();
    document.getElementById(`${index}`).classList.remove("bi-play-fill");
    document.getElementById(`${index}`).classList.add("bi-pause-fill");
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgba(105, 105, 105, .1)";
})



let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () =>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', () =>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', () =>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', () =>{
    item.scrollLeft += 330;
})

document.addEventListener("DOMContentLoaded", function () {
    const volumeIcon = document.getElementById("vol_icon");
    const volumeRange = document.getElementById("vol");
    const volumeBar = document.querySelector(".vol_bar");
    const volumeDot = document.getElementById("vol_dot");
    const audioPlayer = document.getElementById("popular_songs");
  
    volumeRange.addEventListener("input", updateVolume);
  
    function updateVolume() {
      const volumeValue = volumeRange.value;
      const volumePercentage = volumeValue + "%";
  
      volumeBar.style.width = volumePercentage;
      volumeDot.style.left = volumePercentage;
  
      if (volumeValue == 0) {
        volumeIcon.classList.remove("bi-volume-down-fill");
        volumeIcon.classList.add("bi-volume-mute-fill");
      } else if (volumeValue < 50) {
        volumeIcon.classList.remove("bi-volume-mute-fill");
        volumeIcon.classList.add("bi-volume-down-fill");
      } else {
        volumeIcon.classList.remove("bi-volume-mute-fill");
        volumeIcon.classList.add("bi-volume-down-fill");
      }
  
      audioPlayer.volume = volumeValue / 100;
    }
  });
  