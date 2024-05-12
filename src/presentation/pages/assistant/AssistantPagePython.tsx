import { useEffect, useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';
import { createThreadUseCasePython, postQuestionUseCasePython } from '../../../core';

interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPagePython = ({python}: {python: string}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(python + 'python');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [threadId, setThreadId] = useState<string>();

  // Obtener el thread, y si no existe, crearlo
  useEffect(() => {
    const threadId = localStorage.getItem(python + 'ThreadId');
    if ( threadId ) {
      setThreadId( threadId );
    } else {
      createThreadUseCasePython()
      .then( (id)=> {
        setThreadId( id );
        localStorage.setItem(python + 'ThreadId', id);
      })
    }
  }, []);
  
  const handlePost = async( text: string ) => {
    if ( !threadId ) return;
    setIsLoading(true);
    // Primero, crea el mensaje del usuario
    const userMessage = { text: text, isGpt: false };
    const replies = await postQuestionUseCasePython(threadId, text)
    setIsLoading(false);
    // Luego, agrega la primera respuesta de la IA
    if (replies.length > 0) {
      const firstReply = replies[0];
      if (firstReply.content.length > 0) {
        const aiMessage = { text: firstReply.content[0], isGpt: (firstReply.role === 'assistant'), info: firstReply };
        // Actualiza el estado una sola vez con ambos mensajes ai message va primero y user message va segundo para que salgan invertidos
        setMessages(prevMessages => {
          const newMessages = [aiMessage, userMessage, ...prevMessages];
          localStorage.setItem(python + 'python', JSON.stringify(newMessages));
          return newMessages;
        });
      }
    } else {
      // Si no hay respuesta de la IA, solo muestra el mensaje del usuario
      setMessages(prevMessages => {
        const newMessages = [userMessage, ...prevMessages];
        localStorage.setItem('python', JSON.stringify(newMessages));
        return newMessages;
      });
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Buen día, soy tu asistente de Python,estoy entrenado para ayudarte en cualquier duda que tengas ¿en qué puedo ayudarte?" />
  
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