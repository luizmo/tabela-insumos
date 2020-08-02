import React, {useState} from 'react';
import DefaultInput from './components/DefaultInput';
import Select from 'react-select';
import { useFormik } from 'formik';

const MACHINES = [
  { value: 'maquina_01', label: 'Máquina_01' },
  { value: 'maquina_02', label: 'Máquina_02' },
  { value: 'maquina_03', label: 'Máquina_03' },
];

const IMPLEMENTS = [
  { value: 'implemento_01', label: 'Implemento_01' },
  { value: 'implemento_02', label: 'Implemento_02' },
  { value: 'implemento_03', label: 'Implemento_03' },
  { value: 'implemento_04', label: 'Implemento_03' },
];

const OPERATORS = [
  { value: 'operador_01', label: 'Operador_01' },
  { value: 'operador_02', label: 'Operador_02' },
  { value: 'operador_03', label: 'Operador_03' },
];

const INPUTS = [
  { value: 'insumo_01', label: 'Insumo_01' },
  { value: 'insumo_02', label: 'Insumo_02' },
  { value: 'insumo_03', label: 'Insumo_03' },
];

const NOT_FOUND = () => 'Nenhuma opção encontrada';

function App() {
  const [submited, setSubmited] = useState(false);

  const initialValues ={
    os: '',
    where: '',
    machine: '',
    date:'',
    time:'',
    implement: '',
    operator: '',
    inputs: '',
  }

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: async values => {
      console.log(values)
      setSubmited(true)
      formik.resetForm({values: ''})
    }
  });

  function handleMultiChange(name, options){
   if( options && options.length > 1){
    formik.setFieldValue(name, (options).map((item) => item.value))
   }
   else{
    formik.setFieldValue(options)
   }
  }
  return (
    <div className="App">
      <div className={submited ? 'show success': 'success'}>
        <p>Dados regitrados com sucesso!</p>
        <a href="/">Continuar</a>
      </div>  
      <form onSubmit={formik.handleSubmit}> 
        <img src={require('./assets/rastreagro.svg')} alt="RastreAgro"/>
        <DefaultInput 
          label="Ordem de Serviço"
          placeholder="Ordem de Serviço"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.os}
          name="os"
        />
        <DefaultInput 
          label="Quando"
        >
          <div className="row">
            <input
              name="date" 
              type="date" 
              value={formik.values.date} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input 
              name="time"
              type="time" 
              value={formik.values.time} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  
            />
          </div>
        </DefaultInput>
        <DefaultInput
          name="where"
          label="Onde"
          placeholder="Onde"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.where}
        />
        <div className="wrapper-row">
          <DefaultInput label="Máquina">
            <Select 
              options={MACHINES} 
              isSearchable  
              className="select" 
              placeholder="Digite aqui a máquina"
              noOptionsMessage={NOT_FOUND}
              onChange={selectedOption => formik.setFieldValue(selectedOption)}
              onBlur={formik.handleBlur}
              name="machine"
              type="text"
              value={formik.values.machine.value}
            />
          </DefaultInput>
          <DefaultInput label="Implemento" >
            <Select 
              options={IMPLEMENTS} 
              isSearchable 
              className="select" 
              placeholder="Digite aqui o implemento"
              noOptionsMessage={NOT_FOUND}
              onChange={selectedOption => formik.setFieldValue(selectedOption)}
              name="implement"
              type="text"
              value={formik.values.implement.value}
            />
          </DefaultInput>
        </div>

        <DefaultInput label="Operador">  
          <Select 
            options={OPERATORS} 
            isSearchable 
            className="select" 
            placeholder="Digite aqui o nome do operador"
            noOptionsMessage={NOT_FOUND}
            isMulti
            onChange={selectedOption => handleMultiChange('operator', selectedOption)}
            name="operator"
            type="text"
            value={formik.values.operator.value}
            error={formik.errors.operator}
          />
        </DefaultInput>

        <DefaultInput label="Insumo">
          <Select 
            options={INPUTS} 
            isSearchable 
            isMulti 
            className="select" 
            placeholder="Digite aqui os insumos"
            noOptionsMessage={NOT_FOUND}
            onChange={selectedOption => handleMultiChange('inputs', selectedOption)}
            name="inputs"
            type="text"
          />
        </DefaultInput>  
        <button type="submit" disabled={!formik.values.inputs}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default App;
