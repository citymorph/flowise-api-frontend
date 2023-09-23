const form = document.querySelector("form");
const messageInput = document.getElementById("message");
const responseEl = document.getElementById("response");
const messageBtn = document.getElementById("message-btn");
const talkVideo = document.getElementById('talk-video');
const chatBox = document.getElementById('chat-box');
const chatStart = document.getElementById('chat-start');
const chatReset = document.getElementById('chat-reset');
const chatChoice = document.getElementById('chat-choice');

talkVideo.setAttribute('playsinline', '');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(messageInput.value);
  console.log(sessionStorage.getItem('choice'));
  messageBtn.disabled = true;
  messageBtn.innerHTML = "Sending...";

  var ai_endpoint;
  switch(sessionStorage.getItem('choice')) {
    case "learn":
      ai_endpoint = "/api/info";
      break;
    case "pic":
      ai_endpoint = "/api/pic";
      break;
    default:
      ai_endpoint = "/api/ask";
  }

  try {
    const res = await fetch(ai_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageInput.value }),
    });

    const data = await res.json();

    if (sessionStorage.getItem('choice') == "pic") {
      processPicResponse(data.message);
    } else {
      processResponse(data.message);
    }
  } catch (error) {
    playfaultVideo(error.message);
  } finally {
    messageBtn.disabled = false;
    messageBtn.innerHTML = "Send";
    messageInput.value = "";
  }
});

function processPicResponse(data) {
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/here.mp4';
  talkVideo.loop = false;
  talkVideo.play();
  responseEl.innerHTML = "Here it is " + "<a href='" + data + "' class='text-blue-400 no-underline hover:underline' target='_blank'>picture</a>";
}

function processResponse(data) {
  responseEl.innerHTML = data;
}

function playAwakeVideo() {
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/kailee_idle2.mp4';
  talkVideo.loop = true;
  talkVideo.play();
}

function playIntroVideo() {
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/kailee_intro.mp4';
  talkVideo.loop = false;
  talkVideo.play();
  responseEl.innerHTML = 'Hi I hope your day is well. My name is Kailee, and I am the AI assistant here at City Morph Studio. We are a product design lab based here in the South Bay. We specialize in web technologies and automation. What can I help you with today?';
  chatStart.classList.add('invisible');
  chatChoice.classList.remove('invisible');
  talkVideo.addEventListener('ended',playIdleVideo,false);
}

function selectChat() {
  sessionStorage.setItem('choice','chat');
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/ask_talk.mp4';
  talkVideo.loop = false;
  talkVideo.play();
  responseEl.innerHTML = 'Ok...what would you like to talk about?';
  chatChoice.classList.add('invisible');
  chatReset.classList.remove('invisible');
  chatBox.classList.remove('invisible');
}

function selectLearn() {
  sessionStorage.setItem('choice','learn');
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/cm_info.mp4';
  talkVideo.loop = false;
  talkVideo.play();
  responseEl.innerHTML = 'In 2013, Dr Paul Lu, an aerospace engineer formed City Morph Studio in Los Angeles to pursue product creation at the intersection of art, technology, and engineering. His vision was, and still is, very simple. Change the world through innovative design! What would you like to know about the company?';
  chatChoice.classList.add('invisible');
  chatReset.classList.remove('invisible');
  chatBox.classList.remove('invisible');
}

function selectPicture() {
  sessionStorage.setItem('choice','pic');
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/make_picture.mp4';
  talkVideo.loop = false;
  talkVideo.play();
  responseEl.innerHTML = 'What would you like to make?';
  chatChoice.classList.add('invisible');
  chatReset.classList.remove('invisible');
  chatBox.classList.remove('invisible');
}

function selectReset() {
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/reset.mp4';
  talkVideo.loop = false;
  talkVideo.play();
  responseEl.innerHTML = 'Ok, sure!';
  chatChoice.classList.remove('invisible');
  chatReset.classList.add('invisible');
  chatBox.classList.add('invisible');
}

function playIdleVideo() {
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/kailee_idle2.mp4';
  talkVideo.loop = true;
  talkVideo.play();
}

function playResponseVideo(url,message) {
  talkVideo.src = url;
  talkVideo.loop = false;
  talkVideo.play();
  responseEl.innerHTML = message;
}

function playfaultVideo(message) {
  talkVideo.src = '/video/tech_issues.mp4';
  talkVideo.loop = false;
  talkVideo.play();
  responseEl.innerHTML = "Hmm...I'm having some technical issues at the moment " + message;
}

playAwakeVideo();
