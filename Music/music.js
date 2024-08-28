document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const folderInput = document.getElementById('folderInput');
    const songList = document.getElementById('songList');
    const currentSongContainer = document.getElementById('currentSong');
    let selectedFiles = [];
    let currentSongIndex = 0;

    function playPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }

    function loadSongs() {
        songList.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const truncatedName = truncateFileName(file.name, 30); // Change 30 to your desired length
            const listItem = document.createElement('li');
            listItem.innerHTML = `<i class="fas fa-play play-icon"></i><span class="song-name">${truncatedName}</span>`;
            listItem.addEventListener('click', () => loadSong(index));
            songList.appendChild(listItem);
        });
    }

    function loadSong(index) {
        currentSongIndex = index;
        const file = selectedFiles[index];
        const objectURL = URL.createObjectURL(file);
        audioPlayer.src = objectURL;
        audioPlayer.load();
        audioPlayer.play();

        // Display the currently playing song with truncation
        const truncatedName = truncateFileName(file.name, 30); // Change 30 to your desired length
        currentSongContainer.textContent = `Now Playing: ${truncatedName}`;
    }

    function truncateFileName(fileName, maxLength) {
        if (fileName.length > maxLength) {
            return fileName.substring(0, maxLength - 3) + '...';
        }
        return fileName;
    }

    folderInput.addEventListener('change', function (event) {
        selectedFiles = Array.from(event.target.files);
        loadSongs();
    });

    audioPlayer.addEventListener('ended', function () {
        // Autoplay next song
        const nextIndex = (currentSongIndex + 1) % selectedFiles.length;
        loadSong(nextIndex);
    });

    // Next button functionality
    document.getElementById('nextButton').addEventListener('click', function () {
        const nextIndex = (currentSongIndex + 1) % selectedFiles.length;
        loadSong(nextIndex);
    });

    // Previous button functionality
    document.getElementById('prevButton').addEventListener('click', function () {
        const prevIndex = (currentSongIndex - 1 + selectedFiles.length) % selectedFiles.length;
        loadSong(prevIndex);
    });
});
