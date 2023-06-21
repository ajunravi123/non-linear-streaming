const express = require('express');
const fs = require('fs');
const cors = require('cors');
const WebSocket = require('ws');
const app = express();

app.use(cors());
app.use(express.static("public"))

const middleware = async (req, res, next)=>{
    try {
        let token = req.headers.token || req.query.token
        if(token == undefined){
            res.status(401).json({error : true, message : "Permission denied"})
        }else{
            //Add toekn validation code here
            req.next()
        }
    } catch (e) {
        res.status(401).json({error : true, message : e.message})
    }
}

app.use(middleware);

var videos = {}

try {
  const jsonData = fs.readFileSync('videos.json', 'utf8');
  const parsedData = JSON.parse(jsonData);
  videos = parsedData;
} catch (error) {
  console.error('Error reading JSON file:', error);
}

app.get('/videos', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(videos);
})


// Streaming video
app.get('/video', (req, res) => {
    let video_id = req.query.id
    const range = req.headers.range;
    // For simplicity, the video url is generated automatically from the id. Change it later.
    const videoPath = `./videos/${video_id}.mp4`;
    const videoSize = fs.statSync(videoPath).size;
    const positions = range.replace(/bytes=/, '').split('-');
    const start = parseInt(positions[0], 10);
    // Setting a specific video chunksize for optimization
    let pre_size = 100000
    const end = (start + pre_size) >= (videoSize - 1) ? (videoSize - 1) : (start + pre_size);
    const contentLength = (end - start) + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
        "last_time" : 30
    }
    res.writeHead(206, headers);
    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res);
});

app.listen('3001', () => {
    console.log('Video streaming Server is running on port 3001');
});
