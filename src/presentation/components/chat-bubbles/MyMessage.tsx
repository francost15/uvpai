import userLogo from '../../../assets/logouvp.png';
interface Props {
    text: string;
}
export const MyMessage = ({text}: Props) => {
    return (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
            <img src={userLogo} alt="Logo de usuario" className="w-10 h-10 rounded-full object-cover"/>
                <div className="relative mr-3 text-sm  py-2 px-4 shadow rounded-xl bg-gray-900 ">
                    <div>{text}</div>
                </div>
            </div>
        </div>
    )
}
