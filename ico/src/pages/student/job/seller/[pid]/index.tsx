import { getTeacherProductDetailAPI } from '@/api/common/shop/getTeacherProductDetailAPI'
import { deleteTeacherProductAPI } from '@/api/teacher/shop/deleteTeacherProductAPI'
import ModalAlert from '@/components/common/Modal/ModalAlert'
import useModal from '@/components/common/Modal/useModal'
import NotiTemplate from '@/components/common/StackNotification/NotiTemplate'
import ShopDetail from '@/components/student/Shop/ShopDetail'
import useNavigate from '@/hooks/useNavigate'
import useNotification from '@/hooks/useNotification'
import { getTeacherProductDetailType } from '@/types/teacher/apiReturnTypes'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'

function index() {
  const router = useRouter()
  const navigate = useNavigate()
  const noti = useNotification()
	const { pid } = router.query
  const queryClient = useQueryClient()
  

  const teacherProductDetailQuery = useQuery<getTeacherProductDetailType>(
		["student", "job", "seller", "detail", `${String(pid)}`],
		() => getTeacherProductDetailAPI({pid: String(pid)}),
		// { staleTime: 200000 },
	)

  const deleteHandler = () => {
    
      deleteTeacherProductAPI({ pid: String(pid) })
      .then((res) => {
        noti({content: <NotiTemplate type={"ok"} content={"상품을 삭제했어요!"}/>, duration: 5000})
        queryClient.invalidateQueries(["teacherProducts"])
        navigate(`/student/job/seller`)
      })
      .catch((err) => {
        console.log(err)
        noti({content: <NotiTemplate type={"alert"} content={err.response.data.message}/>, duration: 5000})

      })
    
  }
  
  
  return (
    <div>
      
      {pid && <ShopDetail query={teacherProductDetailQuery} pid={Number(pid)} isSeller={true} editUrl={`/student/job/seller/${String(pid)}/update`} deleteHandler={deleteHandler}/>}
    </div>
  )
}

export default index