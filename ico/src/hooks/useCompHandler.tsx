import { useState } from "react";

export default function useCompHandler(): [() => void, () => void, boolean] {
	const [compState, setCompState] = useState<boolean>(false)
    
	const openComp = () => {
        setCompState(() => true)
    }
    const closeComp = () => {
        setCompState(() => false)
    }
	return [openComp, closeComp, compState];
} 