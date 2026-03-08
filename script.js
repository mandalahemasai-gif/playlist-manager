class Node {
    constructor(title, artist, file) {
        this.title = title;
        this.artist = artist;
        this.file = file;
        this.next = null;
        this.prev = null;
    }
}

let head = null;
let tail = null;
let current = null;

let audioPlayer = new Audio();
let isPlaying = false;

let library = [
    {title: "Track One", artist: "Artist A", file: "songs/song1.mp3"},
    {title: "Track Two", artist: "Artist B", file: "songs/song2.mp3"},
    {title: "Track Three", artist: "Artist C", file: "songs/song3.mp3"},
    {title: "Track Four", artist: "Artist D", file: "songs/song4.mp3"}
];

function renderLibrary() {
    const list = document.getElementById("library-list");
    list.innerHTML = "";
    for (let i = 0; i < library.length; i++) {
        let li = document.createElement("li");
        li.innerText = library[i].title + " by " + library[i].artist;
        list.appendChild(li);
    }
}

function sortLibrary() {
    for (let i = 0; i < library.length - 1; i++) {
        for (let j = 0; j < library.length - i - 1; j++) {
            if (library[j].title > library[j + 1].title) {
                let temp = library[j];
                library[j] = library[j + 1];
                library[j + 1] = temp;
            }
        }
    }
    renderLibrary();
}

function addToPlaylist(title, artist, file) {
    let newNode = new Node(title, artist, file);
    
    if (head === null) {
        head = newNode;
        tail = newNode;
        newNode.next = head;
        newNode.prev = tail;
    } else {
        tail.next = newNode;
        newNode.prev = tail;
        newNode.next = head;
        head.prev = newNode;
        tail = newNode;
    }
}

function loadSong(node) {
    document.getElementById("current-song").innerText = node.title + " by " + node.artist;
    audioPlayer.src = node.file;
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        document.getElementById("play-btn").innerText = "Play";
    } else {
        audioPlayer.play();
        document.getElementById("play-btn").innerText = "Pause";
    }
    isPlaying = !isPlaying;
}

function playNext() {
    if (current !== null) {
        current = current.next;
        loadSong(current);
        if (isPlaying) {
            audioPlayer.play();
        }
    }
}

function playPrev() {
    if (current !== null) {
        current = current.prev;
        loadSong(current);
        if (isPlaying) {
            audioPlayer.play();
        }
    }
}

function init() {
    renderLibrary();
    
    for(let i = 0; i < library.length; i++) {
        addToPlaylist(library[i].title, library[i].artist, library[i].file);
    }
    
    current = head;
    if(current !== null) {
        loadSong(current);
    }
}

init();