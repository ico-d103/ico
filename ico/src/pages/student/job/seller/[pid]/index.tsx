import { getTeacherProductDetailAPI } from '@/api/common/shop/getTeacherProductDetailAPI'
import { getTeacherProductDetailType } from '@/types/teacher/apiReturnTypes'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'

function index() {
  const router = useRouter()
	const { pid } = router.query

  const teacherProductDetailQuery = useQuery<getTeacherProductDetailType>(
		["student", "job", "rule"],
		() => getTeacherProductDetailAPI({pid: String(pid)}),
		// { staleTime: 200000 },
	)
  
  
  return (
    <div>{JSON.stringify(teacherProductDetailQuery.data)}</div>
  )
}

export default index