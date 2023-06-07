import axios from 'axios'
import React,{useEffect} from 'react'
import { refreshFunction } from '../MainFiles/App'
import { useDispatch } from 'react-redux'

interface IFullCombinationOfItemByIdProps{
    id: string
}
export default function FullCombinationOfItemById(props: IFullCombinationOfItemByIdProps) {
    const {id} = props;

    const dispatch = useDispatch();

    const getAllCombination = (id: string) => {
        axios.get(`https://api.native-flora.tk/Item/GetAllCombinations?id=${id}`)
            .then(res=>console.log(res.data.data))
    }

    useEffect(()=>{ refreshFunction(dispatch, ()=>getAllCombination(id)) }, [])
  return (
    <div>FullCombinationOfItemById</div>
  )
}
