import React, { useState } from 'react'
import ContactWithUs from '../Components/ContactWithUs';
import LoadingComp from './LoadingComp';
import ChangeMetricsModalView from './ChangeMetricsModalView';
import OrderCard from './OrderCard';
import UpNavigation from '../Components/UpNavigation';
import WarningModalView from './WarningModalView';
import ReactModal from 'react-modal';
import './Style/TypeCatalog.css'

export default function TypeCatalog({ setIsBasketEmpty, catalogOrders }) {

  const [WarningMessageIsOpen, setWarningMessageIsOpen] = useState(false);
  const [AddedOrder, setAddedOrder] = useState(false)
  const [modalView, setModalView] = useState(false)
  const [modalViewStep, setModalViewStep] = useState(1)
  
  //Заказ который есть в корзине, но User хочет поменять метрики 
  const [selectedOrder, setSelectedOrder] = useState(Array);

  const customStylesForModal = {
    content: {
      width: '30%',
      height: '40%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: 'black',
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: '20px',
    },
}

  return (
    <>
      <UpNavigation hide={'hide'}/>
      <div className='ContainerForTypeCatalog' id='HideNavBarMainLink'>
        {
          WarningMessageIsOpen
              ? <WarningModalView WarningMessageIsOpen={WarningMessageIsOpen}/>
                :<>
                  <h2></h2>
                  <div className='ContainerForCards' >
                    {
                      catalogOrders.length === 0
                      ? <LoadingComp />
                        : <OrderCard 
                            catalogOrders={catalogOrders}
                            setWarningMessageIsOpen={setWarningMessageIsOpen}
                            setModalViewStep={setModalViewStep}
                            setSelectedOrder={setSelectedOrder}
                            setAddedOrder={setAddedOrder}
                            setIsBasketEmpty={setIsBasketEmpty}
                            setModalView={setModalView}
                            />
                    }
                  </div>
                    {
                      (AddedOrder)
                        ? <ReactModal 
                            isOpen={AddedOrder}
                            ariaHideApp={false}
                            contentLabel="Selected Option"
                            style={customStylesForModal}
                          >
                            <h2>Ваш товар добавлен в корзину!</h2>
                          </ReactModal>
                          :<></>
                    }
                    {
                      modalView
                        ? <ChangeMetricsModalView 
                            modalView={modalView}
                            setModalView={setModalView}
                            modalViewStep={modalViewStep}
                            setModalViewStep={setModalViewStep}
                            selectedOrder={selectedOrder}
                            />
                          : <></>
                    }
                </>
        }
      </div>
      <ContactWithUs />
    </>
  )
}
