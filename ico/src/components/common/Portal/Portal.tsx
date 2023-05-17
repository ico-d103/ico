import React, { ReactElement, useState, useEffect } from "react"
import { createPortal } from "react-dom"

function Portal({ children }: { children: ReactElement }) {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
		return () => setMounted(false)
	}, [])

	if (typeof window === "undefined") return <></>

	return mounted ? createPortal(children, document.getElementById("portal") as HTMLElement) : <></>
}

export default Portal
