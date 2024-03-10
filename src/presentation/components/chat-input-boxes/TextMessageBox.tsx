import { FormEvent, useState } from 'react';


interface Props {
    onSendMessage: (message: string)=>void;
    placeholder?: string;
    disableCorrections?: boolean;
}


export const TextMessageBox = ({ onSendMessage, placeholder, disableCorrections = false }: Props) => {

    const [message, setMessage] = useState('')
    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ( message.trim().length === 0 ) return;

    onSendMessage( message );
    setMessage('');
    }

    return (
    <form
        onSubmit={ handleSendMessage }
        className="flex flex-row items-center h-1 rounded-xl bg-black w-full px-2"
    >

        <div className="flex-grow">
        <div className="relative w-full">

            <input 
            type="text" 
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-black focus:outline-none focus:border-purple-700 pl-2 h-10 "
            placeholder={ placeholder }
            autoComplete={ disableCorrections ? 'on': 'off' }
            autoCorrect={ disableCorrections ? 'on': 'off' }
            spellCheck={ disableCorrections ? 'true': 'false' }
            value={ message }
            onChange={ (e) => setMessage( e.target.value ) }
            />


        </div>
        </div>

                {/* boton de enviar */}
                <div className="ml-4">
    <button className="btn-primary mt-11">
        <div className="svg-wrapper-1">
        <div className="svg-wrapper">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            ></path>
            </svg>
        </div>
        </div>
        <span className="mr-2">Enviar</span>
    </button>
    </div>




    </form>
  )
}