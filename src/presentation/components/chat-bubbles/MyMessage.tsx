interface Props {
    text: string;
}
export const MyMessage = ({text}: Props) => {
    return (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgb(90, 0, 117)', padding: '1.25rem' }}>
                    F
                </div>
                <div className="relative mr-3 text-sm  py-2 px-4 shadow rounded-xl " style={{ backgroundColor: 'rgb(90, 0, 117)', padding: '1.25rem' }}>
                    <div>{text}</div>
                </div>
            </div>
        </div>
    )
}
