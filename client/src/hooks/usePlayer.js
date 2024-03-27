"use client"
import { useEffect, useRef, useState } from "react"


const usePlayer = ()=>{
    const [player, setPlayer] = useState({});


    return {player, setPlayer}
}

export default usePlayer