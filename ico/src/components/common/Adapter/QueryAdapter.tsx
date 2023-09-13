import Alert from "@/components/student/common/Loading/Alert"
import Loading from "@/components/student/common/Loading/Loading"
import { UseQueryResult } from "@tanstack/react-query"
import React, { ReactNode, Children, ReactElement } from "react"

type CommonProps  = {
	children: ReactNode
	isEmpty: boolean
	fetchingLabel?: string
	errorLabel?: string
  emptyLabel?: string
	labelSize?: number
}

type QueryWithDataProps = {
  query: UseQueryResult<any, unknown>;
  isSuccess?: never;
  isFetching?: never;
  isError?: never;
};

type QueryWithoutDataProps = {
  query?: never;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
};
  
type QueryAdapterPropsType = CommonProps & (QueryWithDataProps | QueryWithoutDataProps)

function QueryAdapter({ children, query, isSuccess, isFetching, isError, isEmpty, fetchingLabel, errorLabel, emptyLabel, labelSize }: QueryAdapterPropsType) {

	if ((query && query.isFetching) || isFetching) {
		return (
			<Loading
				size={96}
				labelSize={labelSize || 18}
				labelMargin={"0px 0px 0px 0px"}
				label={fetchingLabel || "목록을 불러오는 중이에요!"}
			/>
		)
	} else if ((query && query.isError) || isError) {
		return (
			<Alert
				size={128}
				labelSize={labelSize || 18}
				labelMargin={"0px 0px 0px 0px"}
				label={errorLabel || "오류가 발생했어요!"}
			/>
		)
	} else if (isEmpty) {
		return (
			<Alert
				size={128}
				labelSize={labelSize || 18}
				labelMargin={"0px 0px 0px 0px"}
				label={emptyLabel || "목록이 비어있어요!"}
			/>
		)
	} else if ((query && query.isSuccess) || isSuccess) {
		return <React.Fragment>{children}</React.Fragment>
	}
  return <React.Fragment/>
}

export default QueryAdapter

// function QueryAdapter({ children, query, isEmpty, loadingLabel, errorLabel, labelSize }: QueryAdapterPropsType) {
// 	const childrenArr = (Children.toArray(children) as Array<ReactElement<any>>)[0]

//   if (query.isLoading || query.isFetching) {
//     return (
//       <Wrapper childrenArr={childrenArr}>
//         <Loading size={96} labelSize={labelSize || 18} labelMargin={"24px 0px 16px 0px"} label={loadingLabel || '목록을 불러오는 중이에요!'} />
//       </Wrapper>
//     )
//   } else if (query.isError) {
//     <Wrapper childrenArr={childrenArr}>
//       <Alert size={128} labelSize={labelSize || 18} labelMargin={"24px 0px 16px 0px"} label={errorLabel || '오류가 발생했어요!'} />
//     </Wrapper>
//   } else if (isEmpty) {
//     <Wrapper childrenArr={childrenArr}>
//       <Alert size={128} labelSize={labelSize || 18} labelMargin={"24px 0px 16px 0px"} label={errorLabel || '목록이 비어있어요!'} />
//     </Wrapper>
//   } else if (query.isFetched || query.isSuccess) {
//     return (
//       <Wrapper childrenArr={childrenArr}>{childrenArr.props.children}</Wrapper>
//     )
//   }
// }

// const Wrapper = ({
// 	childrenArr,
// 	children,
// }: {
// 	childrenArr: React.ReactElement<any, string | React.JSXElementConstructor<any>>
// 	children: ReactNode
// }) => React.cloneElement(childrenArr, { children: children })
