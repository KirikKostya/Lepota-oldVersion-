import React, { useState } from "react";
import Select from "react-select";
import "./Styles/SingleSelect.css";

export default function SingleSelect({ options, placeholder }) {
  
  const [activeOption, setActiveOption] = useState(String);
  
  const formatOptionLabel = (option) => (
    <div
      style={{
        height: "35px",
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
          ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')), date: 'Новые'}))
            : (option.label === 'Старые') 
              ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')), date: 'Старые'}))
                : (option.label === 'Доставка')
                  ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')), deliveType: 'Доставка'}))
                    : (option.label === 'Самовывоз')
                      ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')), deliveType: 'Самовывоз'}))
                        : (option.label === 'Получен')
                          ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')), deliveStatus: 'Получено'}))
                            : (option.label === 'Не получен') 
                              ? localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric')), deliveStatus: 'Не получено'}))
                                : localStorage.setItem('filterMetric', JSON.stringify({...JSON.parse(localStorage.getItem('filterMetric'))}))
      }}
    >
      <span>{option.label}</span>
      <svg
        width="12"
        height="8"
        viewBox="1 1 12 8"
        fill="none"
      >
        <path
          d="M1 4L4.5 7.5L11 1"
          stroke="#5A9DFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            // JSON.parse(localStorage.getItem('filterMetric')).date == option.label 
            //   && 
            // option.label === activeOption 
            //   ? "active" : "false"
              activeOption === option.label ? "active" : "false"}
        />
      </svg>
    </div>
  );

  const singleSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      height: "44px",
      fontWeight: "400",
      fontSize: "14px",
      fontStyle: "normal",
      lineHeight: "16px",
      color: "black",
      margin: 0,
      backgroundColor: state.isSelected ? "#F5FCFF" : "white",
    }),
    menuList: (base) => ({
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
    }),
  };

  return (
    <div className="containerForSelect">
      <>
        <Select
          placeholder={placeholder}
          styles={singleSelectStyles}
          singleSelect={true}
          isObject={false}
          isSearchable={true}
          options={options}
          formatOptionLabel={formatOptionLabel}
          showArrow
          maxMenuHeight={264}
        />
      </>
    </div>
  );
}
