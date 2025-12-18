const socket = io();

const nameInput = document.querySelector("#name-input");

const messageInput = document.querySelector("#message-input");
const messageSubmit = document.querySelector("#message-submit");

const messagesContainer = document.querySelector("#messages-container");

const uuid = document.querySelector('main').getAttribute('uuid')

messageSubmit.addEventListener("click", () => {
  try {
    if (nameInput.value === "" && nameInput.value.length < 1)
      throw Error("Veuillez mettre un nom d'utilisateur !");
    if (messageInput.value === "" && messageInput.value.length < 1)
      throw Error("Veuillez mettre un message !");

    socket.emit("message:send", {
      author: nameInput.value,
      content: messageInput.value,
      uuid
    });
  } catch (e) {
    alert(e);
  }
});

socket.on("message:received", (data) => {
  messagesContainer.insertAdjacentHTML(
    "beforeend",
    renderMessage(data)
  );
    scrollToBottom()
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
                          
                            <span class="${data.uuid === uuid ? 'text-danger' : ''} fw-bold"> ${data.author} </span>| ${dayjs(data.timestamp).format('DD/MM/YYYY HH:mm')}
                          </p>
                        </div>
                      </div>
`;
}
