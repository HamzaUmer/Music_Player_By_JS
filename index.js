const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const singer = document.getElementById("artist");
const songTitle = document.getElementById("title");
const songs = document.querySelector("audio");
const image = document.querySelector("img");
let progress = document.getElementById("progress");
let curr_time = document.getElementById("c_time");
const t_duration = document.getElementById("t_time");
const progress_div =document.getElementById("progress_div");
//Songs Data
const songData = [
    {
        name:"thunder",
        sname: "Thunder",
        songTitle:"THUNDER",
        singer: "Imagine Dragons",
    },
    {
        name:"stereo",
        sname: "Stereo",
        songTitle:"STEREO HEARTS",
        singer: "Adam Levine",
    },
    {
        name:"xxxtencation",
        sname: "Baby",
        songTitle:"BABY",
        singer: "XXXTENTACION",
    },
    {
        name:"night",
        sname: "Night",
        songTitle:"THE NIGHT WE MET",
        singer: "Lord Huron",
    },
    {
        name:"IntoYourArms",
        sname: "IntoYourArms",
        songTitle:"INTO YOUR ARMS",
        singer: "Witt Lowry ft. Ava Max",
    },
    {
        name:"intheENd",
        sname: "linkinPark",
        songTitle:"IN THE END",
        singer: "Linkin Park",
    },
    {
        name:"faded",
        sname: "Faded",
        songTitle:"FADED",
        singer: "Alan Walker",
    },
    {
        name:"dusk",
        sname: "DuskTillDawn",
        songTitle:"DUSK TILL DAWN",
        singer: "Zayn Malik ft. Sia",
    },
    {
        name:"chainsmokers",
        sname: "IWant",
        songTitle:"JUST LIKE THIS",
        singer: "Chainsmoker&Coldplay",
    },
    {
        name:"canwekiss",
        sname: "CanWeKissForever",
        songTitle:"CWKF?",
        singer: "Kina ft. Adriana Proenza",
    },
    {
        name:"cant",
        sname: "Can't help",
        songTitle:"Falling in Love",
        singer: "Elvis Presley",
    },
    {
        name:"badliar",
        sname: "BadLiar",
        songTitle:"BAD LIAR",
        singer: "Imagine Dragons",
    },

]
isplaying = false;
//For play functionality
const playSong = () => {
    isplaying=true;
    songs.play();
    play.classList.replace('fa-play', 'fa-pause');
    image.classList.add("anime");
}
//For pause functionality
const  pauseSong = () => {
    isplaying=false;
    songs.pause();
    play.classList.replace('fa-pause', 'fa-play');
    image.classList.remove("anime");
}

play.addEventListener('click', ()=>{
    // if(isplaying) {
    //     pauseSong();
    // }
    // else {
    //     playSong();
    // }
    //we can write above if-else like that
    isplaying ? pauseSong() : playSong();
})

//Changine the whole Song data

const loadSong = (songData) => {
    songTitle.textContent = songData.songTitle;
    singer.textContent = songData.singer;
    songs.src = "songs/" + songData.sname + ".mp3";
    image.src = "images/" + songData.name + ".jpg";
} 
// loadSong(songData[1])
songIndex = 0;
//Next button button functionality
const nextSong = () => {
    songIndex = (songIndex+1)% songData.length;
    loadSong(songData[songIndex]);
    playSong();
    
}
//Previous button button functionality
const prevSong = () => {
    songIndex = (songIndex-1+songData.length)% songData.length;
    loadSong(songData[songIndex]);
    playSong();
}

//Previous Bar Functionality
songs.addEventListener('timeupdate', (perform) => {//The timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
    const {currentTime, duration} = perform.srcElement;//Object destructuring of properties of timeUpdate
    let progress_duration =(currentTime / duration)*100;//Formula for width percentage
    progress.style.width = `${progress_duration}%`;//Editing in progress id css
    
    //Song Duration Update
    let minute_duration = Math.floor(duration /60);//second conversion into minutes
    let second_duration = Math.floor(duration % 60);//minuter conversion into second
    if(second_duration<10){
        second_duration = `0${second_duration}`;
    }
    if(duration) {
        t_duration.textContent = `${minute_duration} : ${second_duration}`;
    }

    //Song Current Time Update
    let minute_current = Math.floor(currentTime /60);//second conversion into minutes
    let second_current = Math.floor(currentTime % 60);//minuter conversion into second
    if(second_current<10){
        second_current = `0${second_current}`;
    }
    curr_time.textContent = `${minute_current} : ${second_current}`;
});

//progress onclick functionality
progress_div.addEventListener("click", (per) => {
    const {duration} = songs;
    let move_progress = (per.offsetX/ per.srcElement.clientWidth)*duration;//for progress bar onclick and change music duration
    songs.currentTime = move_progress;
})
 //For ending the send and goto next send
 songs.addEventListener('ended',nextSong);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

