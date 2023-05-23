export interface IOption{
    label: string;
    value: string
}
export interface ISelectOption{
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