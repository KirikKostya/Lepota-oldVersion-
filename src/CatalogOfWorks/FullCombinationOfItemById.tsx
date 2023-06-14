import axios from 'axios'
import { useEffect, useState } from 'react'
import { refreshFunction } from '../MainFiles/App'
import { useDispatch } from 'react-redux'
import { ICard } from '../Admin/Update/Interfaces/Interface'
import { loadingComplate, loadingUncomplate } from '../ReduxToolkit/Slices'
import CardOfWork from '../Components/CardOfWork'
import ReactModal from 'react-modal'
import WarningModalView from '../Modals/WarningModalView'

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

    useEffect(()=>{ refreshFunction(dispatch, ()=>getAllCombination(id)) }, [])
  return (
    <div style={{width: '75%', display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
      {
        cards.map((el: ICard, index: number)=>(
          <CardOfWork key={index} card={el} isAllCombination={true} setAddedOrder={setAddedOrder} setModalView={setModalView}/>
        ))
      }
      {
        addedOrder
          ? <WarningModalView warningMessageIsOpen={addedOrder} header={'Ваш товар добавлен в корзину!'} />
            : modalView
                &&
              <WarningModalView warningMessageIsOpen={modalView} header={'Такой товар уже есть в корзине'}>
                <p>Изменить количество товаров можно в корзине</p>
              </WarningModalView>
      }
    </div>
  )
}

export default FullCombinationOfItemById;