import React, { useState, useEffect } from 'react'
import ContactWithUs from '../Components/ContactWithUs';
import LoadingComp from './LoadingComp';
import ChangeMetricsModalView from './ChangeMetricsModalView';
import OrderCard from './OrderCard';
import UpNavigation from '../Components/UpNavigation';
import WarningModalView from './WarningModalView';
import ReactModal from 'react-modal';
import './Style/TypeCatalog.css'

export default function TypeCatalog({ catalogOrders }) {

  const [WarningMessageIsOpen, setWarningMessageIsOpen] = useState(false);
  const [AddedOrder, setAddedOrder] = useState(false)
  const [modalView, setModalView] = useState(false)
  const [modalViewStep, setModalViewStep] = useState(1)
  
  //Заказ который есть в корзине, но User хочет поменять метрики 
  const [selectedOrder, setSelectedOrder] = useState(Array);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <>
      <UpNavigation hide={'hide'}/>
      <div className='ContainerForTypeCatalog' id='hideNavBarMainLink'>
        {
          WarningMessageIsOpen
              ? <WarningModalView WarningMessageIsOpen={WarningMessageIsOpen}/>
                :<>
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
                          >
                            <h2 className='modal-header'>Ваш товар добавлен в корзину!</h2>
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
