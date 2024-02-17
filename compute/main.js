window.addEventListener("DOMContentLoaded", () => {
  // Initialize the UI.
  const status = document.querySelector(".status");
  
  // set initial status to yellow await
  status.textContent = "Awaiting...";
  status.classList.add("await");

  const websocket = new WebSocket("ws:/192.168.1.62:8001/");

  const button = document.querySelector(".btn");
  const changeLocButton = document.querySelector(".changeLocBtn");
  sendReady(button, websocket);
  sendChangeLoc(changeLocButton, websocket);
  receiveData(status, websocket);
});

function sendReady(button, websocket) {
  button.addEventListener("click", ({ target }) => {
    websocket.send(JSON.stringify({ type: "ready" }));
  });
}

function sendChangeLoc(button, websocket) {
  button.addEventListener("click", ({ target }) => {
    websocket.close();
  });
  
  const data_container = document.querySelector(".data");
  data_container.textContent = "Connected!"
}

function receiveData(status, websocket) {
  websocket.addEventListener("message", ({ data }) => {
    const event = JSON.parse(data);
    status.textContent = "Computing...";
    status.classList.remove("await");
    status.classList.add("compute");
    setTimeout(() => {
      status.textContent = "Done!";
      status.classList.remove("compute");
      status.classList.add("done");
    }, 2000);
    let result = computeData(event.data);
    console.log(result)
    result = {
      data: result,
      type: "result"
    }
    websocket.send(JSON.stringify(result));
  });
}


function computeData(data) {
  // update UI with data
  const data_container = document.querySelector(".data");
  let result = eval(data);
  data_container.textContent = result;
  // do something with data
  return result;
}