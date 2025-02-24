import React, { useEffect } from 'react'

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
        {message}
    </span>
  </div>
</div>
  )
}

export default Notification