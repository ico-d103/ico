export type getAdminTeacherCertReturnType = {
    content: getAdminTeacherCertType[]
    pageable: {
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        },
        offset: number
        pageNumber: number
        pageSize: number
        paged: boolean
        unpaged: boolean
    }
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    },
    first: boolean
    numberOfElements: number
    empty: boolean
}

export type getAdminTeacherCertType = {
    id: number,
    name: string,
    image: string
}