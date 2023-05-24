export interface IOption{
    label: string,
    value: string
}
export interface ISelectOption{
    id: string,
    metric: string,
    value: string
}

//SingleSelect
export interface ISingleSelect{
    options: IOption[], 
    placeholder?:string,
    width:string, 
    index?:number,
    selectedOptions?:ISelectOption[], 
    setSelectedOptions?:React.Dispatch<React.SetStateAction<ISelectOption[]>>, 
    type:string
}

//CreateKitModal
export interface ICreateKitProps{
    isOpen: boolean, 
    setIsOpen: (bool: boolean)=>void, 
    kitVariants: number[], 
    itemId: number, 
    selectedVariants: IVariant[]
}
export interface IKit{
    description: string,
    icon: string[],
    id: number,
    itemId: number,
    name: string,
    price: string
}

//Create Variant modal
export interface ICreateVariantProps{
    isOpen: boolean, 
    setIsOpen: (bool: boolean)=>void, 
    setError: (str:string)=>void, 
    cleanSelectedOptions: ()=>void
}
export interface IVariant{
    description: string,
    icon: string[],
    id: string,
    itemId: string,
    name: string,
    price: string
}

//UpdateDescription
export interface IUpdateDescriptionProps{
    isOpen: boolean, 
    defaultDescription:string, 
    setIsOpen: (bool: boolean)=>void
}

//UpdateMetric
export interface IUpdateMetricProps{
    isOpen: boolean, 
    metricKey: string, 
    defaultMetricValue: string, 
    setIsOpen: (bool: IOpenUpdateMetric)=>void
}
export interface IOpenUpdateMetric{
    isOpen: boolean,
    value: string
}
//UpdateName
export interface IUpdateNameProps{
    isOpen: boolean, 
    defaultName:string, 
    setIsOpen: (bool: boolean)=>void
}

//UpdatePhotos
export interface IUpdatePhotosProps{
    isOpen: boolean, 
    photos: string[], 
    setIsOpen: (bool: boolean)=>void
}

//UpdateVariants
export interface IUpdateVariantProps{
    isOpen: boolean, 
    variant: IVariant, 
    setIsOpen: (bool: boolean)=>void
}

//TypeCatalog
export interface IItemOfWork{
    item: ICard,
    variants: IVariant[]
    kits: IKits[]
}

export interface ICard{
    id: number,
    name: string,
    description: string,
    price: number,
    icon: string[],
    sizes: ISizes
}
export interface IKits{
    id: number,
    kitId: number,
    name: string,
    variants: number[],
    price: number,
    icon: string[],
    itemId: number
}
export interface ISizes{
    Depth: string, 
    Width: string, 
    Height: string,
    Length: string,
    Weight: string, 
    Diameter: string,
    Material: string
}

//OrderCard
export interface IOrderCarsProps{
    catalogOrders: IItemOfWork[],
    setWarningMessageIsOpen: (bool:boolean)=>void,
    setAddedOrder: (bool:boolean)=>void,
    setModalView: (bool:boolean)=>void,
    fetchProducts: (num:number)=>void,
    variants: IVariant[],
    setIsOpenUpdateVariant: (bool:boolean)=>void
}

//Profile
export interface IProfile{
    firstName: string,
    surName: string,
    fatherName: string,
    address: string,
    zipCode: string,
    birthday: string,
    phone: string,
    vk: string,
    instagram: string,
    telegram: string
}

//svgOnClick
export interface IOnClick{
    onClick: ()=>void
}