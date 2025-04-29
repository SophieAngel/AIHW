document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.textContent = messageText;
            messageElement.className = 'message';
            messages.appendChild(messageElement);
            messageInput.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});