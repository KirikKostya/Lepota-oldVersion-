import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ICard } from '../Admin/Update/Interfaces/Interface';
import CardOfWork from '../Components/CardOfWork';
import { useDispatch } from 'react-redux';
import { loadingComplate, loadingUncomplate} from '../ReduxToolkit/Slices';

const AllKits:React.FC = () => {

    const [allKits, setAllKits] = useState<ICard[]>([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get('https://api.native-flora.tk/Kit/GetAll')
            .then(res=>setAllKits(res.data.data));
        dispatch(loadingComplate());    
    }, [])
  return (
    <>
        {
            allKits.map(kit=>(
                <CardOfWork key={kit.id} card={kit} isAllCombination={true}/>
            ))
        }   
    </>
  )
}

export default AllKits;