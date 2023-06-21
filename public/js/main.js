const videoElement = document.getElementById('playing_video');
var modal = document.getElementById('actionModal');
modal.style.display = 'none';


//Note: default settings should be fetched from server. Also, use localstorage to store token or any other settings.
var active_id = 0
var last_watched_video_id = 1
var last_end_time = 0
var default_video_id = 1

var all_videos = {}
var token = "ADYAUSERTOKEN"
var current_feel = "happy"
var watched_ids = []
var next_action_at = 0

function load_video(id){
    active_id = id;
    videoElement.src = `http://localhost:3000/video?token=${token}&id=${id}`;
    let title = ""
    for(let i in all_videos[current_feel]){
        if(id == all_videos[current_feel][i]["id"]){
            title = all_videos[current_feel][i]["title"]
            break
        }
    }
    watched_ids.push(id);
    document.getElementById("video_meta").innerText = title + " | " + current_feel
}


function load_videos(){
    fetch("http://localhost:3000/videos", {
        headers: {
            token: `${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        all_videos = data
        generate_action_box(all_videos)
        active_id = all_videos["happy"][0]["id"]
        next_action_at = all_videos["happy"][0]["action_at"]
        load_video(active_id, all_videos["happy"][0]["title"])
    })
    .catch(error => {
        alert(error)
        console.error('Error:', error);
    });
}

function generate_action_box(feelings){
    let action_box = document.getElementById("feelings")
    for(let feel in feelings){
        action_box.innerHTML += `<button class="action_btn" feel="${feel}" onclick="execute_action()">${feel}</button>`;
    }
}

load_videos()

videoElement.addEventListener('timeupdate', () => {
    videoElement.removeAttribute("controls") 
    if (Math.floor(videoElement.currentTime) >= next_action_at) {
        videoElement.pause();
        modal.style.display = 'block';
    }
});


function execute_action(feel = 'happy'){
    current_feel = event.target.getAttribute("feel")
    modal.style.display = 'none';
    let videos = all_videos[current_feel]
    let next_id = 0
    let cnt = 0
    for(let v in videos){
        if(!watched_ids.includes(videos[v]["id"])){
            next_id = videos[v]["id"]
            break
        }
        cnt++
    }

    next_id = next_id != 0 ? next_id : (Math.floor(Math.random() * videos.length))
    load_video(next_id)
}

