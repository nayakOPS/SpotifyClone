console.log("Welcome to Spotify");
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
//for the songname in the bar
let masterSongName = document.getElementById('masterSongName');
//for declaring variable for iterating the coverphotos for each songs
let songItem = Array.from(document.getElementsByClassName('songItems'));
let songs=[
    {songname:"Hey Jude",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songname:"Getting Better",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songname:"I'm Only Sleeping",filePath:"songs/3.mp3",coverPath:"covers/3.png"},
    {songname:"Yellow Submarine",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songname:"Eleanor Rigby",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songname:"Don't Let me down",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songname:"Penny Lane",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songname:"A Day in The Life",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songname:"Help!",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    {songname:"Something",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"},
    {songname:"Come Together",filePath:"songs/11.mp3",coverPath:"covers/11.jpg"}
]
//iterating for adding the cover photos for each song
songItem.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    //for iterating songs name
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})
//Handle Play/Pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen TO Events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    /* (Currentime/duration)*100  = we get percent value */
    /* currentTime = (PD/100) */
    // console.log(progress);
    myProgressBar.value=progress;
})
//adding a change event
myProgressBar.addEventListener('change',()=>{
    // audioElement.currentTime = myPrgressBar.value; but need to change the percent to duration
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100 ;

})
//function for when clicked at the play button changes to pause
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        //not letting to make all button pause
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}
//to change the play to pause button in song items
// songItemPlay button changes to pause 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click', (e)=>{
        //adding the callbackfunction for the event listener
        // console.log(e.target);
        //in console tab it shows the element in which songlist it was clicked at play button
        makeAllPlays();
        //each song index is given through id starting from 0
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        //updating/index the song through id which is parsed before
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-cirlce'); 
    });
});
//when someone click the previous button it need to run
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
    songIndex -= 1 ;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-cirlce');
}); 
//for next
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
    songIndex += 1 ;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-cirlce');
}); 