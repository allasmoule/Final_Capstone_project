import React, { useState, useRef } from "react";
import {
  Send,
  MessageCircle,
  X,
  Bot,
  Image,
  Video,
  Mic,
  Paperclip,
  Users,
} from "lucide-react";
import { askOpenAI, analyzeLegalContext } from "../utils/openaiApi";
import { renderFormatted } from "../utils/format";
import { useLanguage } from "../context/LanguageContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "image" | "video" | "audio";
  fileUrl?: string;
}

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onAdvocateSuggestion?: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({
  isOpen = false,
  onToggle,
  onAdvocateSuggestion,
}) => {
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text:
        language === "bn"
          ? "নমস্কার! আমি আপনার আইনি সহায়ক। আপনার কী সমস্যা? আমি সাহায্য করতে পারি। আপনি টেক্সট, ছবি, ভিডিও বা অডিও পাঠাতে পারেন।"
          : "Hello! I am your legal assistant. What is your problem? I can help. You can send text, images, videos or audio.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const quickResponses =
    language === "bn"
      ? [
          "পারিবারিক বিরোধ",
          "সম্পত্তি বিষয়ক",
          "চাকরি সংক্রান্ত",
          "ব্যবসায়িক সমস্যা",
          "ফৌজদারি মামলা",
          "সাইবার ক্রাইম",
          "অ্যাডভোকেট প্রয়োজন",
          "জরুরি সহায়তা",
        ]
      : [
          "Family Dispute",
          "Property Issue",
          "Job Related",
          "Business Problem",
          "Criminal Case",
          "Cyber Crime",
          "Need Advocate",
          "Emergency Help",
        ];

  const handleSendMessage = (
    text?: string,
    type: "text" | "image" | "video" | "audio" = "text",
    fileUrl?: string,
  ) => {
    const messageText = text || inputText;
    if (!messageText.trim() && !fileUrl) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
      type,
      fileUrl,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Get AI response from OpenAI API
    setTimeout(() => {
      // Get AI response using OpenAI API
      askOpenAI(messageText)
        .then((response) => {
          setIsTyping(false);

          // Analyze the legal context for better categorization
          const context = analyzeLegalContext(messageText);

          const botResponse: Message = {
            id: Date.now() + Math.random(),
            text: response.text,
            sender: "bot",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, botResponse]);

          // Add contextual follow-up if needed
          if (context.urgency === "high") {
            setTimeout(() => {
              // Detect if user message is in Bangla
              const isBangla = /[\u0980-\u09FF]/.test(messageText);
              const urgentText = isBangla
                ? `⚠️ এটি একটি জরুরি বিষয় বলে মনে হচ্ছে। অবিলম্বে আমাদের হটলাইন ০১৮৪৪-৪৪৪৪৪৪ এ যোগাযোগ করুন বা ৯৯৯ এ কল করুন।`
                : `⚠️ This seems to be an urgent matter. Please contact our hotline 01844-444444 immediately or call 999.`;

              const urgentFollowUp: Message = {
                id: Date.now() + Math.random(),
                text: urgentText,
                sender: "bot",
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, urgentFollowUp]);
            }, 1500);
          }
        })
        .catch((error) => {
          setIsTyping(false);
          console.error("Chatbot error:", error);

          const errorResponse: Message = {
            id: Date.now() + Math.random(),
            text: "দুঃখিত, এই মুহূর্তে আমি আপনার প্রশ্নের উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন বা আমাদের হটলাইন ০১৮৪৪-৪৪৪৪৪৪ এ যোগাযোগ করুন।",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorResponse]);
        });
    }, 500);

    setInputText("");
  };

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video" | "audio",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fileName = file.name;
      const typeLabel =
        language === "bn"
          ? type === "image"
            ? "ছবি"
            : type === "video"
              ? "ভিডিও"
              : "অডিও"
          : type === "image"
            ? "Image"
            : type === "video"
              ? "Video"
              : "Audio";
      handleSendMessage(
        `${typeLabel} ${language === "bn" ? "পাঠানো হয়েছে" : "sent"}: ${fileName}`,
        type,
        fileUrl,
      );
    }
  };

  const handleAdvocateSuggestion = () => {
    if (onAdvocateSuggestion) {
      onAdvocateSuggestion();
    }
    // Scroll to advocates section
    const advocatesSection = document.getElementById("advocates");
    if (advocatesSection) {
      advocatesSection.scrollIntoView({ behavior: "smooth" });
    }
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[90vw] bg-white rounded-lg shadow-2xl z-50 border">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <div>
                <h3 className="font-bold">{t("chatbot.title")}</h3>
                <p className="text-xs opacity-90">{t("chatbot.status")}</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="text-white hover:bg-blue-700 p-1 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.type === "image" && message.fileUrl && (
                    <img
                      src={message.fileUrl}
                      alt="Uploaded"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  {message.type === "video" && message.fileUrl && (
                    <video
                      src={message.fileUrl}
                      controls
                      className="w-full h-32 rounded mb-2"
                    />
                  )}
                  {message.type === "audio" && message.fileUrl && (
                    <audio
                      src={message.fileUrl}
                      controls
                      className="w-full mb-2"
                    />
                  )}
                  {message.sender === "bot" ? (
                    <div className="text-sm">
                      {renderFormatted(message.text)}
                    </div>
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString(
                      language === "bn" ? "bn-BD" : "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs p-3 rounded-lg bg-gray-100 text-gray-800">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 ml-2">
                      {t("chatbot.typing")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Advocate Suggestion Button */}
          <div className="p-3 border-t bg-blue-50">
            <button
              onClick={handleAdvocateSuggestion}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
            >
              <Users className="h-4 w-4 mr-2" />
              {t("chatbot.advocateSuggestion")}
            </button>
          </div>

          {/* Quick Responses */}
          <div className="p-3 border-t bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">
              {t("chatbot.quickResponses")}
            </p>
            <div className="flex flex-wrap gap-1">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>

          {/* Media Upload Buttons */}
          <div className="p-3 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-gray-600">{t("chatbot.sendFiles")}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                  title="ছবি পাঠান"
                >
                  <Image className="h-4 w-4" />
                </button>
                <button
                  onClick={() => videoInputRef.current?.click()}
                  className="p-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors"
                  title="ভিডিও পাঠান"
                >
                  <Video className="h-4 w-4" />
                </button>
                <button
                  onClick={() => audioInputRef.current?.click()}
                  className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                  title="অডিও পাঠান"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Hidden File Inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              className="hidden"
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              className="hidden"
            />
            <input
              ref={audioInputRef}
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileUpload(e, "audio")}
              className="hidden"
            />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={t("chatbot.placeholder")}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
