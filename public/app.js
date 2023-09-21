const form = document.querySelector("form");
const messageInput = document.getElementById("message");
const responseEl = document.getElementById("response");
const messageBtn = document.getElementById("message-btn");
const talkVideo = document.getElementById('talk-video');
talkVideo.setAttribute('playsinline', '');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log(messageInput.value);

  messageBtn.disabled = true;
  messageBtn.innerHTML = "Sending...";

  try {
    const res = await fetch("/api/flowise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageInput.value }),
    });

    const data = await res.json();

    responseEl.innerHTML = data.message;
  } catch (error) {
    responseEl.innerHTML = error.message;
  } finally {
    messageBtn.disabled = false;
    messageBtn.innerHTML = "Send";
    messageInput.value = "";
  }
});

function playIdleVideo() {
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/kailee_idle2.mp4';
  talkVideo.loop = true;
}

function playIntroVideo() {
  talkVideo.srcObject = undefined;
  talkVideo.src = '/video/kailee_intro.mp4';
  talkVideo.loop = false;
  responseEl.innerHTML = 'Hi I hope your day is well. My name is Kailee, and I am the AI assistant here at City Morph Studio. We are a product design lab based here in the South Bay. We specialize in web technologies and automation. What can I help you with today?';
}

playIdleVideo();
