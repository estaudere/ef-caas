window.addEventListener("DOMContentLoaded", () => {
  // Initialize the UI.
  const status = document.querySelector(".status");
  
  // set initial status to yellow await
  status.textContent = "Awaiting...";
  status.classList.add("await");

  const websocket = new WebSocket("ws://localhost:8001/");

  const button = document.querySelector(".btn");
  sendReady(button, websocket);
  receiveData(status, websocket);
});

function sendReady(button, websocket) {
  button.addEventListener("click", ({ target }) => {
    websocket.send("ready");
  });
}

function receiveData(status, websocket) {
  websocket.addEventListener("message", ({ data }) => {
    const event = JSON.parse(data);
    status.textContent = "Computing...";
    status.classList.remove("await");
    status.classList.add("compute");
    let result = computeData(event.data);
    status.textContent = "Done!";
    status.classList.remove("compute");
    status.classList.add("done");
    websocket.send(JSON.stringify({ result }));
  });
}


function computeData(data) {
  // update UI with data
  const data_container = document.querySelector(".data");
  data_container.textContent = data + " = 42";
  // do something with data
  return 42;
}