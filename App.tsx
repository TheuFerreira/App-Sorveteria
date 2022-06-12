import * as React from 'react';
import Context from './src/services/ContextService';
import LoginArea from './src/navigators/LoginArea';
import Aplicativo from './src/navigators/Aplicativo';

export default function App() {

  const [usuario, setUsuario] = React.useState({});

  return (
    <Context.Provider value={[usuario, setUsuario]}>
      { Object.keys(usuario).length === 0 ? <LoginArea/> : <Aplicativo/> }
    </Context.Provider>
  );
}