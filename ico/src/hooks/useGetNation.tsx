import React from 'react'
import { nationData } from '@/store/store';
import { useAtom } from 'jotai';
import { getNationAPI } from '@/api/common/getNationAPI';
import { getNationType } from '@/types/common/apiReturnTypes';


function useGetNation(): [getNationType, () => void] {
	const [nationDataAtom, setNationDataAtom] = useAtom(nationData)
  const refetch = () => {
    getNationAPI()
      .then((res) => {
        if (res) {
          setNationDataAtom(() => res)
        }
        

      })
    }

  return [nationDataAtom, refetch]
}



export default useGetNation