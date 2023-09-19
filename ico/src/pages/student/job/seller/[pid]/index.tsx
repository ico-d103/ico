import { getTeacherProductDetailAPI } from '@/api/common/shop/getTeacherProductDetailAPI'
import ShopDetail from '@/components/student/Shop/ShopDetail'
import { getTeacherProductDetailType } from '@/types/teacher/apiReturnTypes'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'

function index() {
  const router = useRouter()
	const { pid } = router.query

  const teacherProductDetailQuery = useQuery<getTeacherProductDetailType>(
		["student", "job", "seller", "detail"],
		() => getTeacherProductDetailAPI({pid: String(pid)}),
		// { staleTime: 200000 },
	)
  
  
  return (
    <div>
      <ShopDetail query={teacherProductDetailQuery} pid={Number(pid)} isSeller={true}/>
    </div>
  )
}

export default index