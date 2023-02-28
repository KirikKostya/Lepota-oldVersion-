import React from 'react'
import './Styles/TimingAndDelivery.css'

const Path = [
    {
        id: 0,
        tittle: 'Отправьте заявку',
        discription: 'Мы свяжемся с вами и выясним все детали!'
    },
    {
        id:1,
        tittle: 'Оплата',
        discription: 'Мы работаем по 100% предоплате. Оплата осуществляется переводом на карту BelarusBank, чек естественно предоставляется. ',
    },
    {
        id:2,
        tittle: 'Выполняем работу',
        discription: 'Сроки изготовления изделия от 1 до 10-ти дней (в зависимости от сложности заказа, загруженности мастера и наличии нужных материалов). В момент оформления заказа мы сообщим вам точну дату готовности.',
    },
    {
        id:3,
        tittle: 'Упаковка и достака',
        discription: 'Бережно упаковываем ваш заказ в прочные коробки с противоударным наполнителем. отправляем посылку транспортной компанией БелПочта. Для города Минск самовывод с адреса, который мы вам продиктуем. ',
    }
]

export default function TimingAndDelivery() {
  return (
    <div className='ContainerForTimingAndDelivery' id='TimingAndDelivery'>

        <h1>Время и Доставка</h1>

        <div className='Steps'>
            <div className='containerForGraphicRath'>
                <div className='GraphicPath'>
                    <div className='Circle'>1</div>
                    <hr className='hr'></hr>
                    <div className='Circle'>2</div>
                    <hr className='hr'></hr>
                    <div className='Circle'>3</div>
                    <hr className='hr'></hr>
                    <div className='Circle'>4</div>
                </div>
            </div>
            <div className='TextPath'>
                {
                    Path.map(part=>(
                        <div className='PartOfPath' key={part.id}>
                            <h3>{part.tittle}</h3>
                            <p>{part.discription}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
