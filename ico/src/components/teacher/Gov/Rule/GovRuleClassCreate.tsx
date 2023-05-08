import React from 'react'
import { useMutation, useQuery } from "@tanstack/react-query";
import { getGovRuleAPI } from '@/api/teacher/gov/getGovRuleAPI';
import { putGovRuleAPI } from '@/api/teacher/gov/putGovRuleAPI';
import { postGovRuleAPI } from '@/api/teacher/gov/postGovRuleAPI';
import { getGovRuleType } from '@/types/teacher/apiReturnTypes';
import { useQueryClient } from '@tanstack/react-query';

function GovRuleClassCreate({
	subInputChangeHandler,
	inputState,
	buttons,
	closeHandler,
	idx
}: {
	subInputChangeHandler?: any
	inputState?: any
	buttons?: any
	closeHandler?: Function
	idx?: number
}) {


	const queryClient = useQueryClient();
	const createMutation = useMutation((a: number) => postGovRuleAPI({body: {title: inputState.title, detail: inputState.content}}));
	const updateMutation = useMutation((idx: number) => putGovRuleAPI({idx, body: {title: inputState.title, detail: inputState.content}}));

    const submit = () => {
		if (typeof idx === 'number') {
			updateMutation.mutate(idx, {
				onSuccess: formData => {
					closeHandler && closeHandler()
				  return queryClient.invalidateQueries(["teacher", "govRule"]); // 'return' wait for invalidate
				}})
		} else {
			createMutation.mutate(1, {
				onSuccess: formData => {
					closeHandler && closeHandler()
				  return queryClient.invalidateQueries(["teacher", "govRule"]); // 'return' wait for invalidate
				}})
		}
		
	}
	return (
		<React.Fragment>
			<div>

			</div>
			{buttons(submit)}
		</React.Fragment>
	)
}

export default GovRuleClassCreate