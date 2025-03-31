import { GoogleGenerativeAI } from '@google/generative-ai';

export const handleGeminiRequest = async (message, senderId, receiverId, senderModel, receiverModel, socket) => {
    try {
        // Extract the actual query (remove @ai)
        const genAi = new GoogleGenerativeAI(import.meta.env.VITE_REACT_APP_GEMINI_API_KEY)
        const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
        const query = message.replace('@ai', '').trim();
        const result = await model.generateContent(query);
        const response = result.response;
        const aiResponse = response.text();
        // console.log(`Here is the response : ${response}`)
                
        // Create the AI response message
        const aiMessage = {
            senderId,
            receiverId,
            senderModel,
            receiverModel,
            message: aiResponse,
            isAIResponse: true
        };
        
        // Send the AI response through socket
        socket.emit("sendMessage", aiMessage);
        
        return true;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return false;
    }
};
