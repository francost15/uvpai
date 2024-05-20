import { FormEvent, useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
    onSendMessage: (message: string)=>void;
    placeholder?: string;
    disableCorrections?: boolean;
}

export const TextMessageBox = ({ onSendMessage, placeholder, disableCorrections = false }: Props) => {

    const [message, setMessage] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.setCustomValidity('Por favor, introduce un mensaje.');
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.setCustomValidity(message.trim().length > 0 ? '' : 'Por favor, introduce un mensaje.');
        }
    }, [message]);

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if ( message.trim().length === 0 ) {
            if (inputRef.current) {
                inputRef.current.reportValidity();
            }
            return;
        }

        onSendMessage( message );
        setMessage('');
    }

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-15 rounded-xl  w-full px-1"
        >
            <div className="flex-grow relative">
                <input 
                    ref={inputRef}
                    type="text" 
                    autoFocus
                    name="message"
                    className="flex w-full rounded-xl text-black focus:outline-none border-2 focus:border-fuchsia-600 border-gray-300 pl-4 h-12 "
                    placeholder={ placeholder }
                    autoComplete={ disableCorrections ? 'on': 'off' }
                    autoCorrect={ disableCorrections ? 'on': 'off' }
                    spellCheck={ disableCorrections ? 'true': 'false' }
                    value={ message }
                    onChange={ (e) => setMessage( e.target.value ) }
                    required
                />
                <CSSTransition
                    in={!!message}
                    timeout={1000}
                    classNames="fade"
                    unmountOnExit
                >
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg  style={{color: "#91268f"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    </button>
                </CSSTransition>
            </div>
        </form>
    )
}