import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"

type RenderTableProps = {
	table: any
	maxWidth: number
	perHeight: string
}

function RenderTable({ table, maxWidth, perHeight }: RenderTableProps) {
	const renderTable = table.map((columnContent: any, columnIdx: any) => {
		const renderColumn = Array(maxWidth)
			.fill(null)
			.map((el, idx) => {
				const isTitle = columnIdx === 0 || idx === 0
				if (idx < columnContent.length) {
					return <div key={`${columnContent[idx]}-${idx}`} css={elementWrapperCSS({ isTitle, perHeight })}>{columnContent[idx]}</div>
				} else {
					return <div key={`empty-${idx}`} css={elementWrapperCSS({ isTitle, perHeight })} />
				}
			})

		return <div key={`${columnContent[0]}-${columnIdx}`} css={columnWrapperCSS}>{renderColumn}</div>
	})

	return <div css={tableWrapperCSS}>{renderTable}</div>
}

type TableGeneratorProps = {
	table: any
	perHeight: string
}

function TableGenerator({ table, perHeight }: TableGeneratorProps) {
	const [maxWidth, setMaxWidth] = useState<number>(0)

	useEffect(() => {
		let maxWidth = 0
		table.forEach((el: any) => {
			if (maxWidth < el.length) {
				maxWidth = el.length
			}
		})
		setMaxWidth(() => maxWidth)
	}, [])

	return (
		<React.Fragment>
			{maxWidth !== 0 && <RenderTable table={table} maxWidth={maxWidth} perHeight={perHeight} />}
		</React.Fragment>
	)
}

const tableWrapperCSS = css`
	border-radius: 10px;
	border: 2px solid rgba(0, 0, 0, 0.3);
	overflow: hidden;
`

const columnWrapperCSS = css`
	display: flex;
	width: 100%;
`

const elementWrapperCSS = ({ isTitle, perHeight }: { isTitle: boolean; perHeight: string }) => {
	return css`
		outline: 1px solid rgba(0, 0, 0, 0.3);
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: ${perHeight};
		background-color: ${isTitle && "rgba(0,0,0,0.05)"};
		font-weight: ${isTitle ? "700" : null};
	`
}
export default TableGenerator
