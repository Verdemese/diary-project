import "./App.css";

import Layout from "./container/Layout/Layout";
import Login from './container/Login/Login';

function App() {
  return (    
    <div className='App'>
      <Layout>
        <Login />
      </Layout>
    </div>      
  );
}

export default App;
