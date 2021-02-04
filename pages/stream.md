---
layout: page
title: Live Stream @cretm
permalink: /stream/
post_video:
search_exclude: true
comments: false
edit: false
---

<!-- <div class="embed-responsive embed-responsive-16by9">
  <iframe src="https://www.youtube.com/embed/ljRDkQVOlqU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div> -->

<!-- <video id="stream" class="video-js vjs-fluid vjs-default-skin" controls preload="none" data-setup='{"fluid": true}'>
  <source src="https://vjs.zencdn.net/v/oceans.mp4" type='video/mp4'>
</video> -->

<!-- <video id="stream" class="video-js vjs-fluid vjs-default-skin vjs-16-9 vjs-big-play-centered"
  controls preload="none" data-setup='{"fluid": true}'
  poster='http://content.bitsontherun.com/thumbs/3XnJSIm4-480.jpg' data-setup='{}'>
  <source src="https://vjs.zencdn.net/v/oceans.mp4" type='video/mp4'>
</video> -->
  <!-- <source src="https://fra-cdn.livepeer.com/hls/z8kdh258fwnopq14/index.m3u8" type="application/x-mpegURL"> -->

<!-- <link href="https://unpkg.com/video.js/dist/video-js.css" rel="stylesheet">
<script src="https://unpkg.com/video.js/dist/video.js"></script>
<script src="https://unpkg.com/videojs-contrib-hls/dist/videojs-contrib-hls.js"></script>

<script>
  var player = videojs('stream');
  player.play();
</script> -->

<link rel="stylesheet" href="https://cdn.plyr.io/3.6.2/plyr.css" />
<script src="https://cdn.plyr.io/3.6.2/plyr.js"></script>

<!-- <video preload="none" id="player" autoplay controls crossorigin></video> -->
<!-- <video id="player" playsinline controls data-poster="http://content.bitsontherun.com/thumbs/3XnJSIm4-480.jpg"></video> -->

<style>
  #player {
  --plyr-color-main: #5a74ca;
  }
  .plyr--video.plyr--stopped .plyr__controls { display: none; }
  /*.plyr--video.plyr--paused .plyr__controls { display: none; }*/
  /*.plyr--video .plyr__controls { display: none }*/
</style>

<div class="plyr__video-embed" id="player">
  <iframe
    src="https://www.youtube.com/embed/bTqVqk7FSmY?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
    allowfullscreen
    allowtransparency
    allow="autoplay"
  ></iframe>
</div>

<script>
const player = new Plyr('#player');
</script>
