import React, { ChangeEvent, useState } from "react";
import Select from "react-select";
import { IOption, ISelectOption, ISingleSelect} from "../Admin/Update/Interfaces/Interface";
import CheckMarkForSingleSelect from "../Icons/CheckMarkForSingleSelect";
import "./Styles/SingleSelect.css";

export default function SingleSelect(props: ISingleSelect) {
  
  const {options, placeholder, width, index, selectedOptions, setSelectedOptions, type} = props;
  
  const [activeOption, setActiveOption] = useState<string>('');

  const handlerChanges = (event:any) => {
     if(selectedOptions === undefined || index===undefined || setSelectedOptions===undefined) return
     let newArray: ISelectOption[] = [...selectedOptions];
     newArray[index] = {...newArray[index], metric: event.value, value: ''};
     setSelectedOptions(newArray);
  }
  
  const formatOptionLabel = (option: IOption):React.ReactNode => (
    <div
      style={{
        width: '100%',
        height: '35px',
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        cursor: "pointer",
        margin: 0,
      }}
      onClick={() => {
        setActiveOption(option.label);
        (option.label === 'Новые')
          ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), date: 'Новые'}))
            : (option.label === 'Старые') 
              ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), date: 'Старые'}))
                : (option.label === 'Доставка')
                  ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveType: 'Доставка'}))
                    : (option.label === 'Самовывоз')
                      ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveType: 'Самовывоз'}))
                        : (option.label === 'Получен')
                          ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveStatus: 'Получен'}))
                            : (option.label === 'В пути')
                              ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveStatus: 'В пути'}))
                                : (option.label === 'Принят в обработку') 
                                  ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}'), deliveStatus: 'Принят в обработку'}))
                                    : localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')||'{}')}))
      }}
    >
      <span>{option.label}</span>
      <CheckMarkForSingleSelect className={activeOption === option.label ? "active" : "false"} />
    </div>
  );

  const stylesForSorting = {
    option: (provided:object, state:any) => ({
      ...provided,
      height: '44px',
      display: 'flex',
      alignItems:'center',
      fontWeight: "400",
      fontSize: "14px",
      fontStyle: "normal",
      lineHeight: "16px",
      color: "black",
      margin: 0,
      backgroundColor: state.isSelected ? "#F5FCFF" : "white"
    }),
    menuList: (base:object) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "10px",
      },
      "::-webkit-scrollbar-track": {
        background: "#F5F7FA",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#CAD3E0",
        width: "10px",
        borderRadius: "40px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    })
  };

  const stylesForMetricSingleSelect = {
    ...stylesForSorting,
    control: (base:object)=>({
      ...base,
      alignItems: 'start',
      minHeight: 'none',
      height: '30px',
      color: "red !important"
    }),
    valueContainer: (base:object)=>({
      ...base,
      padding: '0 10px'
    }),
    indicatorsContainer: (base:object)=>({
      ...base,
      height: '30px',
      padding: '5px'
    })
  }

  return (
    <div className="containerForSelect" style={{width: width}}>
        <Select
          styles={type === 'metric' ? stylesForMetricSingleSelect : stylesForSorting}
          singleSelect={true}
          isObject={false}
          isSearchable={true}
          options={options}
          onChange={type === 'metric' ? handlerChanges : ()=>{}}
          formatOptionLabel={type === 'sorting' ? formatOptionLabel : undefined}
          showArrow={true}
          maxMenuHeight={264}
        />
    </div>
  )
}
