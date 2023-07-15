import { useEffect, useState } from 'react';
import { refreshFunction } from '../MainFiles/App';
import { useDispatch } from 'react-redux';
import { ICard } from '../Admin/Update/Interfaces/Interface';
import { loadingUncomplate } from '../ReduxToolkit/Slices';
import CardOfWork from '../Components/CardOfWork';
import axios from 'axios';

interface IFullCombinationOfItemByIdProps{
    id: string
}
const FullCombinationOfItemById: React.FC<IFullCombinationOfItemByIdProps> = (props) => {

    const { id } = props;

    const dispatch = useDispatch();

    const [cards, setCards] = useState<ICard[]>([]);
    
    const getAllCombination = (id: string) => {
      dispatch(loadingUncomplate());
        axios.get(`https://api.native-flora.tk/Item/GetAllCombinations?id=${id}`)
          .then(res=>setCards(res.data.data))
    }

    useEffect(()=>{ refreshFunction(dispatch, ()=>getAllCombination(id)) }, []);
    
  return (
    <div className='fullCombinationContainer'>
      {
        cards.map((card: ICard, index: number)=>(
          <CardOfWork key={index} card={card} isAllCombination={true} />
        ))
      }
    </div>
  )
}

export default FullCombinationOfItemById;