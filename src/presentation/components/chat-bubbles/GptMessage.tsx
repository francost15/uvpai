import { useState } from 'react';
import Markdown from 'react-markdown';

interface Props {
  text: string;
}

export const GptMessage = ({ text }: Props) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('¡Copiado al portapapeles!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Error al copiar');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start justify-between">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 flex-shrink-0">
          AI
        </div>
        <div className="relative ml-1 text-sm bg-neutral-800 pt-1 pb-1 px-2 shadow rounded-xl">
          <Markdown>{text}</Markdown>
          {copySuccess && <div>{copySuccess}</div>}
        </div>
        <button onClick={copyToClipboard}><i className="hover:text-purple-500 fa-regular fa-copy fa-lg"></i></button>
      </div>
    </div>
  );
};