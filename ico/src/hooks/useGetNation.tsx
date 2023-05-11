import React from 'react'
import { getNationType } from '@/types/common/apiReturnTypes'
import { useQuery } from '@tanstack/react-query'

function useGetNation() {
  const init: getNationType = {
		id: 0,
		school: "초등학교",
		grade: 0,
		room: 0,
		title: "국가",
		code: "00000",
		currency: "",
		treasury: 0,
		stock: "",
		trading_start: "",
		trading_end: "",
		credit_up: 0,
		credit_down: 0,
	}
    const { data: nation } = useQuery<getNationType>(["common", "nation"], { enabled: false, placeholderData: init })
  return nation
}

export default useGetNation