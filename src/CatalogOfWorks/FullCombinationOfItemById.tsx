import { useEffect, useState } from 'react';
import { refreshFunction } from '../MainFiles/App';
import { useDispatch } from 'react-redux';
import { ICard } from '../Admin/Update/Interfaces/Interface';
import { loadingUncomplate } from '../ReduxToolkit/Slices';
import CardOfWork from '../Components/CardOfWork';
import SuccessIcon from '../Icons/SuccessIcon';
import WarningIcon from '../Icons/WarningIcon';
import ModalView from '../Modals/ModalView';
import axios from 'axios';

interface IFullCombinationOfItemByIdProps{
    id: string
}
const FullCombinationOfItemById: React.FC<IFullCombinationOfItemByIdProps> = (props) => {

    const { id } = props;

    const dispatch = useDispatch();

    const [cards, setCards] = useState<ICard[]>([]);
    const [addedOrder, setAddedOrder] = useState<boolean>(false);
    const [modalView, setModalView] = useState<boolean>(false);
    
    const getAllCombination = (id: string) => {
      dispatch(loadingUncomplate());
        axios.get(`https://api.native-flora.tk/Item/GetAllCombinations?id=${id}`)
          .then(res=>setCards(res.data.data))
    }

    useEffect(()=>{ refreshFunction(dispatch, ()=>getAllCombination(id)) }, []);
    
  return (
    <div className='fullCombinationContainer'>
      {
        cards.map((el: ICard, index: number)=>(
          <CardOfWork key={index} card={el} isAllCombination={true} setAddedOrder={setAddedOrder} setModalView={setModalView}/>
        ))
      }
      {
        addedOrder
          ? <ModalView isOpen={addedOrder}>
              <h2 className='headerModal-antd'><SuccessIcon />Ваш товар добавлен в корзину!</h2>
            </ModalView>
            : modalView
                &&
              <ModalView isOpen={modalView}>
                <h2 className='headerModal-antd'><WarningIcon />Такой товар уже есть в корзине</h2>
                <h4 className='textModal-antd'>Изменить количество товаров можно в корзине</h4>
              </ModalView>
      }
    </div>
  )
}

export default FullCombinationOfItemById;