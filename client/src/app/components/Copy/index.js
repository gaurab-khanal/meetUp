import { Copy } from 'lucide-react'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'


const CopyRoomId = ({roomId}) => {
  return (
    <div className='flex gap-3 items-center'>
        <div>Copy Room Id: </div>
        <div className='flex border-2 p-1'>
            <span>{roomId}</span>
            <CopyToClipboard text={roomId}>
                <button>
                    <Copy className="ml-3 cursor-pointer"/>
                </button>
            </CopyToClipboard>
        </div>
    </div>
  )
}

export default CopyRoomId