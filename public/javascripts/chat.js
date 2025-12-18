const socket = io();

const nameInput = document.querySelector("#name-input");

const messageInput = document.querySelector("#message-input");
const messageSubmit = document.querySelector("#message-submit");

const messagesContainer = document.querySelector("#messages-container");

messageSubmit.addEventListener("click", () => {
  try {
    if (nameInput.value === "" && nameInput.value.length < 1)
      throw Error("Veuillez mettre un nom d'utilisateur !");
    if (messageInput.value === "" && messageInput.value.length < 1)
      throw Error("Veuillez mettre un message !");

    socket.emit("message:send", {
      author: nameInput.value,
      content: messageInput.value,
      timestamp: 1766054571,
    });
  } catch (e) {
    alert(e);
  }
});

socket.on("message:received", (data) => {
  messagesContainer.insertAdjacentHTML(
    "beforeend",
    renderMessage(data.author, data.content, data.timestamp)
  );
  
});

function renderMessage(author,message,date) {
  return ` 
   <div class="d-flex flex-row justify-content-start">
        <div>
                          <p
                            class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary"
                          >
                            ${message}
                          </p>
                          <p
                            class="small ms-3 mb-3 rounded-3 text-muted float-end"
                          >
                          
                             ${author} | 12:00 PM | Aug 13 
                          </p>
                        </div>
                      </div>
`;
}
