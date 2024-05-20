import Markdown from 'react-markdown';
import sableLogo from '../../../assets/uvp.jpg';

interface Props {
  text: string;
}

export const GptMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 col-end-8 p-2 rounded-lg">
      <div className="flex flex-row items-start justify-start">
        <img src={sableLogo} alt="Logo de sable ia" className="w-10 h-10 rounded-full object-cover"/>
        <div className="relative ml-3 text-sm bg-gray-200 text-black pt-2 pb-2 px-3 shadow rounded-xl">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  );
};