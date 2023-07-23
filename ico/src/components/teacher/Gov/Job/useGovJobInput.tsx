import React, {useReducer, useEffect, useState} from 'react'
import { GovRuleClassDetailProps, certificationType, empoweredType, inputType, validItemType, validType } from './GovJobItemType';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { postGovJobAPI } from '@/api/teacher/gov/postGovJobAPI';
import { putGovJobAPI } from '@/api/teacher/gov/putGovJobAPI';
import useNotification from '@/hooks/useNotification';
import NotiTemplate from '@/components/common/StackNotification/NotiTemplate';


export const JOB_COLOR = [
	"#FF165C",
	"#FF4A4A",
	"#FF8B4A",
	"#FFA234",
	"#FAC91D",
	"#A6D953",
	"#7BD979",
	"#4AB6A9",
	"#4A87FF",
	"#634AFF",
]

export const ILLUST = [
	"https://d3bkfkkihwj5ql.cloudfront.net/worker_male.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/worker_female.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student1.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student2.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student3.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student4.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student5.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/Student6.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/cleaner.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/chef.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/designer.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/garbage_collector.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/reporter.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/repairman.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/firefighter.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/police.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/doctor.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/weather_caster.png",
	"https://d3bkfkkihwj5ql.cloudfront.net/postman.png",
]

const inputReducer = (state: inputType, action: { type: string; value: any }): inputType => {
	switch (action.type) {
		case "CHANGE_TITLE":
			return { ...state, title: action.value }
		case "CHANGE_DETAIL":
			return { ...state, detail: action.value }
		case "CHANGE_SALARY":
			return { ...state, salary: action.value }
		case "CHANGE_CREDIT":
			return { ...state, creditRating: action.value }
		case "CHANGE_COLOR":
			return { ...state, color: action.value }
		case "CHANGE_IMG_URL":
			return { ...state, image: action.value }
		case "CHANGE_TOTAL":
			return { ...state, total: action.value }
		case "CHANGE_CERTIFICATION":
			return { ...state, certification: action.value }
		case "CHANGE_ROLE_STATUS":
			return { ...state, empowered: action.value }
		default:
			return state
	}
}

const validReducer = (state: validType, action: { type: string; value: validItemType }): validType => {
	switch (action.type) {
		case "CHANGE_TITLE":
			return { ...state, title: action.value }
		case "CHANGE_DETAIL":
			return { ...state, detail: action.value }
		case "CHANGE_SALARY":
			return { ...state, salary: action.value }
		case "CHANGE_CREDIT":
			return { ...state, creditRating: action.value }
		case "CHANGE_COLOR":
			return { ...state, color: action.value }
		case "CHANGE_IMG_URL":
			return { ...state, image: action.value }
		case "CHANGE_TOTAL":
			return { ...state, total: action.value }
		case "CHANGE_CERTIFICATION":
			return { ...state, certification: action.value }
		case "CHANGE_EMPOWERED":
			return { ...state, empowered: action.value }
		default:
			return state
	}
}

function useGovJobInput({
	title,
	detail,
	salary,
	color,
	image,
	creditRating,
	total,
	count,
	idx,
	currency,
	empowered,
	powerList,
	certification,
	closeHandler,
}: GovRuleClassDetailProps) {
  const initialInput: inputType = {
		title: title ? title : "",
		detail: detail ? detail : "",
		salary: salary ? String(salary) : "",
		creditRating: creditRating ? String(creditRating) : "",
		color: color ? color : "#FF165C",
		image: image ? image : "/assets/job/worker_male.png",
		total: total ? String(total) : "",
		empowered: empowered ? empowered : [],
		certification,
	}

	const initialValid: validType = {
		title: title ? "notChanged" : "empty",
		detail: detail ? "notChanged" : "empty",
		salary: salary ? "notChanged" : "empty",
		creditRating: creditRating ? "notChanged" : "empty",
		color: color ? "notChanged" : "changed",
		image: image ? "notChanged" : "changed",
		total: total ? "notChanged" : "empty",
		empowered: empowered ? "notChanged" : "empty",
		certification: certification ? "notChanged" : "changed",
	}

	const [inputState, dispatchInput] = useReducer(inputReducer, initialInput)
	const [validState, dispatchValid] = useReducer(validReducer, initialValid)
	const [isSubmitValid, setIsSubmitValid] = useState<boolean>(false)
  const [illustIdx, setIllustIdx] = useState<number>(ILLUST.indexOf(inputState.image))
  const noti = useNotification()


  useEffect(() => {
		const validHandler = function (el: certificationType, idx: number) {
			return el.rating === certification[idx].rating
		}

		const isCertValid = inputState.certification.every(validHandler)

		if (isCertValid === false) {
			dispatchValid({ type: "CHANGE_CERTIFICATION", value: "changed" })
		} else {
			dispatchValid({ type: "CHANGE_CERTIFICATION", value: "notChanged" })
		}
	}, [inputState.certification, certification])

	useEffect(() => {
		if (inputState.title !== title && inputState.title.trim() !== "") {
			dispatchValid({ type: "CHANGE_TITLE", value: "changed" })
		} else if (inputState.title === title) {
			dispatchValid({ type: "CHANGE_TITLE", value: "notChanged" })
		} else if (inputState.title.trim() === "") {
			dispatchValid({ type: "CHANGE_TITLE", value: "empty" })
		}

		if (inputState.detail !== detail && inputState.detail.trim() !== "") {
			dispatchValid({ type: "CHANGE_DETAIL", value: "changed" })
		} else if (inputState.detail === detail) {
			dispatchValid({ type: "CHANGE_DETAIL", value: "notChanged" })
		} else if (inputState.detail.trim() === "") {
			dispatchValid({ type: "CHANGE_DETAIL", value: "empty" })
		}

		if (Number(inputState.salary) !== salary && inputState.salary !== "") {
			dispatchValid({ type: "CHANGE_SALARY", value: "changed" })
		} else if (Number(inputState.salary) === salary) {
			dispatchValid({ type: "CHANGE_SALARY", value: "notChanged" })
		} else if (inputState.salary === "") {
			dispatchValid({ type: "CHANGE_SALARY", value: "empty" })
		}

		if (
			Number(inputState.creditRating) !== creditRating &&
			inputState.creditRating !== "" &&
			inputState.creditRating !== "0"
		) {
			dispatchValid({ type: "CHANGE_CREDIT", value: "changed" })
		} else if (Number(inputState.creditRating) === creditRating) {
			dispatchValid({ type: "CHANGE_CREDIT", value: "notChanged" })
		} else if (inputState.creditRating === "" || inputState.creditRating === "0") {
			dispatchValid({ type: "CHANGE_CREDIT", value: "empty" })
		}

		if (inputState.color !== color && inputState.color.trim() !== "") {
			dispatchValid({ type: "CHANGE_COLOR", value: "changed" })
		} else if (inputState.color === color) {
			dispatchValid({ type: "CHANGE_COLOR", value: "notChanged" })
		} else if (inputState.color.trim() === "") {
			dispatchValid({ type: "CHANGE_COLOR", value: "empty" })
		}

		if (inputState.image !== image && inputState.image.trim() !== "") {
			dispatchValid({ type: "CHANGE_IMG_URL", value: "changed" })
		} else if (inputState.image === image) {
			dispatchValid({ type: "CHANGE_IMG_URL", value: "notChanged" })
		} else if (inputState.image.trim() === "") {
			dispatchValid({ type: "CHANGE_IMG_URL", value: "empty" })
		}

		if (Number(inputState.total) !== total && inputState.total !== "") {
			dispatchValid({ type: "CHANGE_TOTAL", value: "changed" })
		} else if (Number(inputState.total) === total) {
			dispatchValid({ type: "CHANGE_TOTAL", value: "notChanged" })
		} else if (inputState.total === "") {
			dispatchValid({ type: "CHANGE_TOTAL", value: "empty" })
		}

		if (
			(inputState.empowered && empowered && inputState.empowered !== empowered) ||
			(empowered === null && inputState.empowered !== null) ||
			(empowered !== null && inputState.empowered === null)
		) {
			dispatchValid({ type: "CHANGE_ROLE_STATUS", value: "changed" })
		} else if (empowered === null && inputState.empowered === null) {
			dispatchValid({ type: "CHANGE_ROLE_STATUS", value: "notChanged" })
		} else if (inputState.empowered && empowered && inputState.empowered === empowered) {
			dispatchValid({ type: "CHANGE_ROLE_STATUS", value: "notChanged" })
		}
	}, [inputState, title, detail, salary, color, image, creditRating, total, empowered])

	useEffect(() => {
		const arr = Object.values(validState)
		setIsSubmitValid(() => !arr.includes("empty") && arr.includes("changed"))
	}, [validState])

	const queryClient = useQueryClient()

	const createMutation = useMutation((a: number) =>
		postGovJobAPI({
			body: inputState,
		}),
	)
	const updateMutation = useMutation((idx: number) =>
		putGovJobAPI({
			idx,
			body: inputState,
		}),
	)

  const colorPickHandler = (value: string) => {
		dispatchInput({ type: "CHANGE_COLOR", value })
	}

	const illustPickerHandler = (reverse = false) => {
		if (reverse) {
			if (illustIdx > 0) {
				dispatchInput({ type: "CHANGE_IMG_URL", value: ILLUST[illustIdx - 1] })
				setIllustIdx((prev) => prev - 1)
			} else {
				dispatchInput({ type: "CHANGE_IMG_URL", value: ILLUST[ILLUST.length - 1] })
				setIllustIdx(() => ILLUST.length - 1)
			}
		} else {
			if (illustIdx < ILLUST.length - 1) {
				dispatchInput({ type: "CHANGE_IMG_URL", value: ILLUST[illustIdx + 1] })
				setIllustIdx((prev) => prev + 1)
			} else {
				dispatchInput({ type: "CHANGE_IMG_URL", value: ILLUST[0] })
				setIllustIdx(() => 0)
			}
		}
	}

  const ratingHandler = ({ id, reverse = false }: { id: number; reverse: boolean }) => {
		let curIdx: number = 0

		inputState.certification.forEach((item, idx) => {
			if (item.id === id) {
				curIdx = idx
			}
		})

		let value: number | null = null
		if (reverse === true) {
			if (inputState.certification[curIdx].rating > 1) {
				value = inputState.certification[curIdx].rating - 1
			} else if (inputState.certification[curIdx].rating === -1) {
				value = 10
			}
		} else {
			if (inputState.certification[curIdx].rating < 10 && inputState.certification[curIdx].rating !== -1) {
				value = inputState.certification[curIdx].rating + 1
			} else {
				value = -1
			}
		}

		if (value !== null) {
			dispatchInput({
				type: "CHANGE_CERTIFICATION",
				value: inputState.certification.map((item) => (id === item.id ? { ...item, rating: value } : item)),
			})
		}
	}



	const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatchInput({ type: "CHANGE_TITLE", value: event.target.value })
	}

	const detailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatchInput({ type: "CHANGE_DETAIL", value: event.target.value })
	}

	const creditInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) <= 10) {
			dispatchInput({ type: "CHANGE_CREDIT", value: event.target.value })
		}
	}

	const salaryInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) <= 1000000) {
			dispatchInput({ type: "CHANGE_SALARY", value: Number(event.target.value) })
		}
	}

	const totalInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(event.target.value) <= 100) {
			dispatchInput({ type: "CHANGE_TOTAL", value: Number(event.target.value) })
		}
	}

  
  const submitHandler = () => {
		if (typeof idx === "number") {
			return updateMutation.mutate(idx, {
				onSuccess: (formData) => {
					noti({ content: <NotiTemplate type={"ok"} content={"직업을 수정하였습니다."} />, duration: 5000 })
					return queryClient.invalidateQueries(["teacher", "govJob"]) // 'return' wait for invalidate
				},
			})
		} else {
			return createMutation.mutate(1, {
				onSuccess: (formData) => {
					closeHandler && closeHandler()
					noti({ content: <NotiTemplate type={"ok"} content={"직업을 생성하였습니다."} />, duration: 5000 })
					return queryClient.invalidateQueries(["teacher", "govJob"]) // 'return' wait for invalidate
				},
			})
		}
	}

  const handler = {
    colorPickHandler,
    illustPickerHandler,
    ratingHandler,
    titleInputHandler,
    detailInputHandler,
    creditInputHandler,
    salaryInputHandler,
    totalInputHandler,
    submitHandler,
  }



  return {inputState, handler, isSubmitValid}
}

export default useGovJobInput