"use client"
import { cloneDeep } from "lodash";
import { useEffect, useRef, useState } from "react"


const usePlayer = (myId)=>{
    const [player, setPlayer] = useState({});
    const playerCopy = cloneDeep(player);

    const playerHighlighted = playerCopy[myId];

    delete playerCopy[myId];

    const nonHighlitedPlayer = playerCopy;

    return {player, setPlayer, playerHighlighted, nonHighlitedPlayer}
}

export default usePlayer