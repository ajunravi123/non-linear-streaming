
# New Non-linear Video Streaming Prototype - AdyaCare

An express application to stream videos

## Author

Ajun Ravi

## Description

This is a prototype of a non-linear video streaming platform

## Features

- The feelings will be captured after a predefined time. That time can be configured against the videos. (In the prototype, I have added a field for that in /video.json)
- The Feelings capturing popup is automatically populating with the possible feelings options.
- Multiple video can be configured against a feeling. Aslo trying to avoid the repeatation of same videos in a single session.
- Efficient streaming techniques to load GB sized videos within seconds.


## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/ajunravi123/non-linear-streaming.git

   cd Non-linear-VideoStreaming-AdyaCare

2. Download the video files and add to /videos folder

    Download from https://drive.google.com/drive/folders/1-fcvJPMPacRT6oSc0RLTPGmDYRdnbeBW?usp=sharing

    Note: The video file names should be same.

3. Install the dependencies

    npm install

4. Run the server

    node server.js


Access the Application:

Open your web browser and navigate to http://localhost:3001.


```sh
127.0.0.1:3001
```

OR

```sh
http://localhost:3001
```


![Screenshot](https://lh3.googleusercontent.com/drive-viewer/AFGJ81pyed6Rq9580do_S2O-IAQ_geldBn0IBS7PlgwKB_5MBsYCqtp5PPMMk0jXV_xxIUQQGbfhAiUQIOFS44b44O6fTfMIQA=w1920-h932)



Usage
- To add more videos, modify /videos.json file and add the video file to /videos folder.


Note: This is just a prototype. Database, Cache, Fast CDN, and all those things need to be implemented for a production ready application.

