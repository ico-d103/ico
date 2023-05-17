import { useEffect, useState } from "react"

function useMediaQuery(mediaQueryString: string) {
	const [matches, setMatches] = useState<boolean | null>(null)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(mediaQueryString)
		const listener = () => setMatches(!!mediaQueryList.matches)
		listener()
		mediaQueryList.addListener(listener)
		return () => mediaQueryList.removeListener(listener)
	}, [mediaQueryString])

	return matches
}

export default useMediaQuery
