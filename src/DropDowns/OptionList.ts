import { IOption } from "../Admin/Update/Interfaces/Interface";

export const SortByDate:IOption[] = [
    {
        value: 'newOrderds',
        label: 'Новые'
    },
    {
        value: 'oldOrders',
        label: 'Старые'
    }
]
export const SortByDileverStatus:IOption[] = [
    {
        value: 'BeingProcessed',
        label: 'Принят в обработку'
    },
    {
        value: 'Delivered',
        label: 'Получен'
    },
    {
        value: 'Shipping',
        label: 'В пути'
    }
]
export const SortByDileverType:IOption[] = [
    {
        value: 'newOrderds',
        label: 'Доставка'
    },
    {
        value: 'oldOrders',
        label: 'Самовывоз'
    }
]
export const OptionsOfMetrics:IOption[] = [
    {
        label: 'Материалы',
        value: 'Материалы'
    },
    {
        label: 'Ширина (см)',
        value: 'Ширина'
    },
    {
        label: 'Высота (см)',
        value: 'Высота'
    },
    {
        label: 'Глубина (см)',
        value: 'Глубина'
    },
    {
        label: 'Длина (см)',
        value: 'Длина'
    },
    {
        label: 'Диаметр (см)',
        value: 'Диаметр'
    },
    {
        label: 'Вес (кг)',
        value: 'Вес'
    }
]