export type successReturnType = "OK"

export type errorReturnType = {
    code: string
    message: string
}

export type postDuplicationCheckType = {
    message: string
    isDuplicated: boolean
}