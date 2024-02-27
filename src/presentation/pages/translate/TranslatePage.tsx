import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader,TextMessageBoxSelect } from "../../components";
import { translateTextUseCase } from "../../../core/use-cases";

interface Message {
    text: string;
    isGpt: boolean;
}
const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];
export const TranslatePage = () => {
const [isLoading, setIsLoading] = useState(false);
const [messages, setMessages] = useState<Message[]>([])
const handlePost = async(text: string,selectedOption: string) => {
    setIsLoading(true);
    const NewMessage = `Traduce "${text}" al idioma ${selectedOption}`
    setMessages( (prev) => [...prev, {text: NewMessage, isGpt: false}]);
//TODOS UseCase
    const {ok, message} = await translateTextUseCase(text,selectedOption);
    setIsLoading(false);
    if (!ok) {
      return alert(message);
    }
setMessages((prev) => [...prev, {text: NewMessage, isGpt: true}]);
};
return (
<div className="chat-container">
    <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
        {/* Bienvenida*/}
        <GptMessage text= "Hola,Soy el bot ai de traduccion, dame un texto para traducir:)"/>
        {
        messages.map( (message , index) => (
            message.isGpt
            ? (
            <GptMessage key={index} text={message.text} />
            )
            : (
                <MyMessage key={index} text= {message.text}/>
            )
        ))
        }
        {
        isLoading && (
        <div className="col-start-1 col-end-12 fade-in">
            <TypingLoader/>
        </div>
        )
        }
        
    </div>
    </div>
    <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe aqui lo que deseas"
        options={languages}
    />
</div>
)
}
