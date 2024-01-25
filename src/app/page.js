'use client';

import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt'; // 
import 'react-datepicker/dist/react-datepicker.css';

// ... (o restante do seu código)

const MyContainer = ({ className, children, startDate, endDate, onApply }) => {
  return (
    <div className={className}>
      <div className="relative">{children}</div>

      <div className="flex w-full px-4 py-2 border-t justify-between items-center">
        <p>
        {
startDate && endDate
? `${format(startDate, 'dd MMMM yyyy', { locale: pt })} - ${format(endDate, 'dd MMMM yyyy', { locale: pt })}` // Usar o locale para formatar as datas
: ''
}

            
        </p>

        <div className="flex items-center gap-4 text-xs">
          <button>Cancelar</button>
          <button
            onClick={onApply} // Adicionando a chamada da função onApply
            className="text-white bg-indigo-500 flex items-center py-2 px-4 rounded-md font-medium transition-colors w-max text-nowrap hover:bg-indigo-900"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleApply = () => {
    // Esta função é chamada quando o botão "Aplicar" é clicado
    // Pode incluir a lógica para salvar ou processar as datas
    console.log('Datas selecionadas:', startDate, endDate);
    setShowDatePicker(false); // Fechar o datepicker após clicar em "Aplicar"
    return { startDate, endDate }; // Retornar as datas selecionadas
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="w-full mb-6">
        <label
          htmlFor="standard-links"
          className="block text-base font-medium leading-6"
        >
          Nome do Evento
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            readOnly
            defaultValue={
startDate && endDate
? `${format(startDate, 'dd MMMM yyyy', { locale: pt })} - ${format(endDate, 'dd MMMM yyyy', { locale: pt })}` // Usar o locale para formatar as datas
: ''
}
            autoComplete="off"
            name="standard-links"
            id="standard-links"
            onClick={toggleDatePicker}
            className="ring-1 ring-inset ring-transparent block w-full rounded-md py-1.5 pl-4 focus:ring-group-500 placeholder:text-indigo-100 focus:ring-2 focus:ring-inset border border-transparent focus:border-indigo-600/50 sm:text-sm sm:leading-6 bg-gray-950 outline-none shadow-xl mt-2"
          />
        </div>
      </div>

      {showDatePicker && (
        <div className="absolute p-2 top-full mt-2 left-0 flex">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            inline
            isClearable
            monthsShown={2}
            locale={pt}
            calendarContainer={(props) => (
              <MyContainer
                {...props}
                startDate={startDate}
                endDate={endDate}
                onApply={handleApply}
              />
            )}
          />
        </div>
      )}
    </div>
  );
}
