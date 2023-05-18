import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAdminTeacherCertAPI } from "@/api/admin/getAdminTeacherCertAPI"
import { getAdminTeacherCertType } from "@/types/admin/apiReturnTypes"
import { deleteAdminTeacherCertApproveAPI } from "@/api/admin/deleteAdminTeacherCertApproveAPI"
import { deleteAdminTeacherCertDenyAPI } from "@/api/admin/deleteAdminTeacherCertDenyAPI"
import { removeCookie } from "@/api/cookie"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"

function index() {
	const { data, isError, isLoading, isFetching, error, isSuccess, refetch } = useQuery<getAdminTeacherCertType[]>(
		["admin", "teacherCert"],
		getAdminTeacherCertAPI,
		// { staleTime: 200000 },
	)

	const [getTokenStatus, setTokenStatus] = useGetTokenStatus()
	const queryClient = useQueryClient()

	const approveMutation = useMutation((idx: number) => deleteAdminTeacherCertApproveAPI({ idx }))
	const denyMutation = useMutation((idx: number) => deleteAdminTeacherCertDenyAPI({ idx }))

	const approveHandler = (idx: number) => {
		approveMutation.mutate(idx, {
			onSuccess: (formData) => {
				return queryClient.invalidateQueries(["admin", "teacherCert"]) // 'return' wait for invalidate
			},
		})
	}

	const denyHandler = (idx: number) => {
		denyMutation.mutate(idx, {
			onSuccess: (formData) => {
				return queryClient.invalidateQueries(["admin", "teacherCert"]) // 'return' wait for invalidate
			},
		})
	}


	const signoutHandler = () => {
		removeCookie("Authorization", { path: "/" })
        setTokenStatus({showMessage: false}).then((res) => {
            console.log('여기에 할일')
        })
		// navigate("/teacher/login")
	}


	const indivRender =
		data &&
		data.map((el, idx) => {
			return (
				<div css={individualCSS}>
					<div css={textWrapperCSS}>{el.name}</div>
					<div>
						<img css={imgCSS} src={el.image} />
					</div>
					<div css={buttonWrapperCSS}>
						<Button
							text={"승인"}
							fontSize={`var(--teacher-h5)`}
							width={"200px"}
							theme={"positive"}
							onClick={() => {
								approveHandler(el.id)
							}}
						/>
						<Button
							text={"반려"}
							fontSize={`var(--teacher-h5)`}
							width={"200px"}
							theme={"warning"}
							onClick={() => {
								denyHandler(el.id)
							}}
						/>
					</div>
				</div>
			)
		})

	return (<div>
		<button onClick={signoutHandler}>로그아웃</button>
		{data && indivRender}
		</div>)
}

const individualCSS = css`
	display: flex;
	align-items: center;
	width: 100vw;
	justify-content: space-between;
	border: 1px solid black;
`

const imgCSS = css`
	max-width: 500px;
	max-height: auto;
`

const textWrapperCSS = css`
	max-width: 200px;
	width: 200px;
`

const buttonWrapperCSS = css`
	display: flex;
`

export default index
