import { useState } from "react";

export default function useCompHandler() {
	const [compState, setCompState] = useState<boolean>(false)
    
	const openComp = () => {
        setCompState(() => true)
    }
    const closeComp = () => {
        setCompState(() => false)
    }
	return { openComp, closeComp, compState };
} 