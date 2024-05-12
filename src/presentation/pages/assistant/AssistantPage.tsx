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
    // useEffect(() => {
  //   if ( threadId ) {
  //     setMessages( (prev) => [ ...prev, { text: `Número de thread ${ threadId }`, isGpt: true }] )
  //   }
  // }, [threadId])
  
  // componente de historial
  // const handlePost = async( text: string ) => {
  //   if ( !threadId ) return;
  //   setIsLoading(true);
  //   // Primero, agrega el mensaje del usuario
  //   setMessages( (prev) => [...prev, { text: text, isGpt: false }] );
  //   const replies = await postQuestionUseCaseJava(threadId, text)
  //   setIsLoading(false);
  //   // Luego, agrega las respuestas de la IA
  //   for (const reply of replies) {
  //     for (const message of reply.content) {
  //       setMessages( (prev) => [...prev, { text: message, isGpt: (reply.role === 'assistant'), info: reply  }] )
  //     }
  //   }
  // }

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
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 y-2">
          {/* Bienvenida */}
          <GptMessage text="Buen día, soy tu asistente de Javascript,estoy entrenado para ayudarte en cualquier duda que tengas ¿en qué puedo ayudarte?" />
  
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
  )
};