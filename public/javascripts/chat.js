const socket = io();

const messageInput = document.querySelector("#message-input");
const messageSubmit = document.querySelector("#message-submit");

const messagesContainer = document.querySelector("#messages-container");

const uuid = document.querySelector("main").getAttribute("data-uuid");
let username = document.querySelector("main").getAttribute("data-username");

const usernameModalDom = document.querySelector("#changeUsernameModal");
const usernameModal = new bootstrap.Modal(usernameModalDom);

if (!username || username === "") {
  usernameModal.show();
}

messageSubmit.addEventListener("click", () => {
  try {
    if (username && username === "")
      throw Error("Veuillez mettre un nom d'utilisateur !");

    if (messageInput.value === "" && messageInput.value.length < 1)
      throw Error("Veuillez mettre un message !");

    socket.emit("message:send", {
      author: username,
      content: messageInput.value,
      uuid,
    });
  } catch (e) {
    alert(e);
  }
});

socket.on("message:history", (history) => {
  
  history.forEach((data) => {
    messagesContainer.insertAdjacentHTML("beforeend", renderMessage(data));
  });
  
  scrollToBottom();
});

socket.on("message:received", (data) => {
  messagesContainer.insertAdjacentHTML("beforeend", renderMessage(data));
  scrollToBottom();
});

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function renderMessage(data) {
  return ` 
   <div class="d-flex flex-row justify-content-start col-12">
        <div class="col-12">
                          <p
                            class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary"
                          >
                            ${data.content}
                          </p>
                          <p
                            class="small ms-3 mb-3 rounded-3 text-muted float-end"
                          >
                          
                            <span class="${
                              data.uuid === uuid ? "text-danger" : ""
                            } fw-bold"> ${data.author} </span>| ${dayjs(
    data.timestamp
  ).format("DD/MM/YYYY HH:mm")}
                          </p>
                        </div>
                      </div>
`;
}
