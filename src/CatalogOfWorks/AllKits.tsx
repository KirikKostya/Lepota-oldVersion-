import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { loadingComplate, loadingUncomplate} from '../ReduxToolkit/Slices';
import { ICard } from '../Admin/Update/Interfaces/Interface';
import { useDispatch } from 'react-redux';
import ContactWithUs from '../Components/ContactWithUs';
import UpNavigation from '../Components/UpNavigation';
import CardOfWork from '../Components/CardOfWork';
import './Style/AllKits.css';

const AllKits:React.FC = () => {

    const [allKits, setAllKits] = useState<ICard[]>([]);

    const dispatch = useDispatch();

    const memoAllKits = useMemo(()=>{
        return(
            allKits.map(kit=>(
                <CardOfWork key={kit.id} card={kit} isAllCombination={true}/>
            ))
        )
    }, [allKits])

    useEffect(()=>{
        dispatch(loadingUncomplate());
        axios.get('https://api.native-flora.tk/Kit/GetAll')
        .then(res=>setAllKits(res.data.data));
        dispatch(loadingComplate());    
        window.scrollTo(0, 0);
    }, [])
  return (
    <>
        <UpNavigation hide='hide' />
        <div className='allKitsContainer'>
            { memoAllKits }
        </div>
        <ContactWithUs />
    </>
  )
}

export default AllKits;