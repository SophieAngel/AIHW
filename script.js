document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Function to send a message to the backend and display the AI response
    async function sendMessageToAI(message) {
        try {
            const response = await fetch('http://127.0.0.1:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            if (data.response) {
                const aiMessageElement = document.createElement('div');
                aiMessageElement.textContent = `🌷 AI: ${data.response}`;
                aiMessageElement.className = 'message ai-message';
                messages.appendChild(aiMessageElement);
                messages.scrollTop = messages.scrollHeight;
            } else {
                console.error('No response from AI:', data);
            }
        } catch (error) {
            console.error('Error communicating with the backend:', error);
        }
    }

    // Update the send button click event to include AI response
    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const userMessageElement = document.createElement('div');
            userMessageElement.textContent = `You: ${messageText}`;
            userMessageElement.className = 'message user-message';
            messages.appendChild(userMessageElement);
            messageInput.value = '';
            messages.scrollTop = messages.scrollHeight;

            // Send the message to the backend
            sendMessageToAI(messageText);
        }
    });

    // Automatically send a response for every user message
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});