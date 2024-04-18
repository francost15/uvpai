import { useEffect, useState } from 'react';
import { createThreadUseCase } from '../../../core/use-cases/assistant/create.thread.use-case';
import { postQuestionUseCase } from '../../../core/use-cases/assistant/post-question.use-case';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';


interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPageJava= () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [threadId, setThreadId] = useState<string>();

  // Obtener el thread, y si no existe, crearlo
  useEffect(() => {
    const threadId = localStorage.getItem('threadId');
    if ( threadId ) {
      setThreadId( threadId );
    } else {
      createThreadUseCase()
      .then( (id)=> {
        setThreadId( id );
        localStorage.setItem('threadId', id);
      })
    }
  }, []);
  
  const handlePost = async( text: string ) => {

    if ( !threadId ) return;
  
    setIsLoading(true);
  
    // Primero, agrega el mensaje del usuario
    setMessages( prev => [...prev, { text: text, isGpt: false }] );
  
    const replies = await postQuestionUseCase(threadId, text)
    
    setIsLoading(false);
  
    // Luego, agrega las respuestas de la IA
    for (const reply of replies) {
      for (const message of reply.content) {
        setMessages( prev => [...prev, { text: message, isGpt: (reply.role === 'assistant'), info: reply  }] )
      }
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Buen día, soy tu asistente de Java ¿en qué puedo ayudarte?" />
  
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