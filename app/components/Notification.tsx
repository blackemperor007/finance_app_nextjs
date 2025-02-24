import React, { useEffect } from 'react'
import { InfoIcon } from 'lucide-react'
interface NotificationProps {
    message: string
    onclose: () => void ;
}

const Notification : React.FC<NotificationProps> = ({ message, onclose }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onclose()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onclose])

  return (
    <div className="toast toast-bottom toast-left ">
  <div className="alert p-2 text-sm shadow-lg">
    <span className='flex items-center'>
        <InfoIcon className='w-4 h-4 mr-2 font-bold text-accent' />
        {message}
    </span>
  </div>
</div>
  )
}

export default Notification