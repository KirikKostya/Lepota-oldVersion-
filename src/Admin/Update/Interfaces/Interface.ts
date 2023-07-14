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
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
    setError: (str:string)=>void, 
    cleanSelectedOptions: ()=>void,
    fetchProducts: (num: number)=>void
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
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

//UpdateMetric
export interface IUpdateMetricProps{
    isOpen: boolean, 
    metricKey: string, 
    defaultMetricValue: string, 
    setIsOpen: React.Dispatch<React.SetStateAction<IOpenUpdateMetric>>
}
export interface IOpenUpdateMetric{
    isOpen: boolean,
    value: string
}
//UpdateName
export interface IUpdateNameProps{
    isOpen: boolean, 
    defaultName:string, 
    defaultPrice: string
    setIsOpen: (bool: boolean)=>void
}

//UpdatePhotos
export interface IUpdatePhotosProps{
    isOpen: boolean, 
    photos: string[], 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

//UpdateVariants
export interface IUpdateVariantProps{
    isOpen: boolean, 
    variant: IVariant, 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
    description?: string,
    price?: number,
    icon: string[],
    sizes?: ISizes,
    variants?: number[]
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
    catalogOrders: IItemOfWork[]
    fetchProducts: (num:number)=>void
    variants: IVariant[]
    setIsOpenUpdateVariant: React.Dispatch<React.SetStateAction<boolean>>
    setIsOpenUpdatePhotos: React.Dispatch<React.SetStateAction<boolean>>
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

//orderArchive
export interface IOrderArchiveType{
      id: number,
      shipping: boolean,
      address: string,
      fio: string,
      phoneNubmer: string,
      contact: string,
      zipCode: string,
      city: string,
      fullDate:{
        Date: string,
        Time: string
      },
      cartItems: ICartItem[]
      totalPrice: number,
      shippingStatus: string
}

export interface ICartItem{
    cartItemId: number,
    item: ICard,
    variants: IVariant[],
    kit: IKit,
    amount: number,
    price: number
}