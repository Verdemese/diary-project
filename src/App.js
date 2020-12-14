import './App.css';

import Layout from './container/Layout/Layout';
import SignIn from './component/SignIn/SignIn'

function App() {
  return (    
    <div className="App">
      <Layout>
        <SignIn />
      </Layout>
    </div>      
  );
}

export default App;
