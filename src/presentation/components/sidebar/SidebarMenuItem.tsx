import { NavLink } from "react-router-dom"
interface Props {
    to: string;
    icon: string;
    title: string;
    description: string;
}
export const SidebarMenuItem = ({to,icon,title,description}:Props) => {
  return (
    <>
                    <NavLink 
                    to={to}
                    className={({isActive}) =>
                    isActive 
                    ? 'flex justify-center items-center bg-purple-800 rounded-md p-3 transition-colors'
                    : 'flex justify-center items-center hover:bg-purple-700 rounded-md p-2.5 transition-colors'
                }
                >
                    <i className={`${icon} text-2xl mr-4 text-purple-200`} > </i>
                    <div className="flex felx-col flex-grow">
                        <span className="text-white text-lg font-semibold">
                            {title}
                        </span>
                        <span className="text-white">
                            {description}
                        </span>
                    </div>
                </NavLink>
    </>
  )
}


