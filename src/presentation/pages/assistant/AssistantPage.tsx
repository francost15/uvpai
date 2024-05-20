import { useEffect, useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';
import { createThreadUseCase, postQuestionUseCase } from '../../../core';


interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPage = ({js}: {js: string}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(js + 'Js');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [threadId, setThreadId] = useState<string>();
  const [isChatVisible, setIsChatVisible] = useState(false); // Nuevo estado para controlar la visibilidad del chat

  // Obtener el thread, y si no existe, crearlo
  useEffect(() => {
    const threadId = localStorage.getItem(js + 'ThreadId');
    if ( threadId ) {
      setThreadId( threadId );
    } else {
      createThreadUseCase()
      .then( (id)=> {
        setThreadId( id );
        localStorage.setItem(js + 'ThreadId', id);
      })
    }
  }, []);

  const handlePost = async( text: string ) => {
    if ( !threadId ) return;
    setIsLoading(true);
    // Primero, crea el mensaje del usuario
    const userMessage = { text: text, isGpt: false };
    const replies = await postQuestionUseCase(threadId, text)
    setIsLoading(false);
    // Luego, agrega la primera respuesta de la IA
    if (replies.length > 0) {
      const firstReply = replies[0];
      if (firstReply.content.length > 0) {
        const aiMessage = { text: firstReply.content[0], isGpt: (firstReply.role === 'assistant'), info: firstReply };
        // Actualiza el estado una sola vez con ambos mensajes ai message va primero y user message va segundo para que salgan invertidos
        setMessages(prevMessages => {
          const newMessages = [aiMessage, userMessage, ...prevMessages];
          localStorage.setItem(js + 'Js', JSON.stringify(newMessages));
          return newMessages;
        });
      }
    } else {
      // Si no hay respuesta de la IA, solo muestra el mensaje del usuario
      setMessages(prevMessages => {
        const newMessages = [userMessage, ...prevMessages];
        localStorage.setItem(js + 'Js', JSON.stringify(newMessages)); // Cambiado 'messages' a js + 'Messages'
        return newMessages;
      });
    }
  }

  return (
    <>
      {!isChatVisible && ( // Solo muestra el botón si isChatVisible es falso
    <div className="flex justify-end items-center mt-60 sm:mt-72 md:mt-96 mr-2"> {/* Contenedor con Flexbox */}
      <button
        className="group flex items-center justify-center w-11 h-11 bg-fuchsia-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-2xl hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
        onClick={() => setIsChatVisible(true)} // Controlador de clics para mostrar el chat
      >
        <div
          className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        </div>
      <div
        className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-900 group-hover:translate-x-3 group-hover:opacity-100"
        >
        Chat UVP
      </div>
      </button>
    </div>
      )}

      {isChatVisible && ( // Solo muestra el chat si isChatVisible es verdadero
        <div className="chat-container">
<div className='flex justify-between items-center text-white' style={{background: 'linear-gradient(to right,black,purple,purple)'}}>
  {/* <div>
    <h1 className="text-xl font-semibold ml-4">¡Hola, Pantera! 🐾</h1>
  </div> */}
  <button className='flex mb-2 ml-auto mt-2 mr-2' onClick={() => setIsChatVisible(false)}> 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 hover:bg-red-600">
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  </button>
</div>
          <div className="chat-messages mt-2">
            <div className="grid grid-cols-12 y-2">
              {/* Bienvenida */}
              <GptMessage text="¡Bienvenido a la UVP! Soy tu asistente personal Sable, diseñado para facilitar tu experiencia universitaria. Ya sea que necesites información sobre programas académicos,
              eventos, o recursos estudiantiles, estoy aquí para ayudarte. Dime, ¿en qué puedo serte útil Pantera? 😄" />
      
              {
                [...messages].reverse().map( (message, index) => (
                  message.isGpt
                    ? (
                      <GptMessage key={ index } text={ message.text } />
                    )
                    : (
                      <MyMessage key={ index } text={ message.text } />
                    )
                ))
              }
      
              {
                isLoading && (
                  <div className="col-start-1 col-end-12 fade-in">
                    <TypingLoader />
                  </div>
                )
              }
            </div>
          </div>
      
          <TextMessageBox 
            onSendMessage={ handlePost }
            placeholder='Escribe aquí lo que deseas'
            disableCorrections
          />
        </div>
      )}
    </>
  )
};