import { IOption } from "../Admin/Update/Interfaces/Interface";

export const SortByDate:IOption[] = [
    {
        value: 'Новые',
        label: 'Новые'
    },
    {
        value: 'Старые',
        label: 'Старые'
    }
]
export const SortByDileverStatus:IOption[] = [
    {
        value: 'Принят в обработку',
        label: 'Принят в обработку'
    },
    {
        value: 'Получен',
        label: 'Получен'
    },
    {
        value: 'В пути',
        label: 'В пути'
    }
]
export const SortByDileverType:IOption[] = [
    {
        value: 'Доставка',
        label: 'Доставка'
    },
    {
        value: 'Самовывоз',
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