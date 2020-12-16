import "./App.css";

import Layout from "./container/Layout/Layout";
import CalendarBuilder from './container/CalendarBuilder/CalendarBuilder';

function App() {
  return (    
    <div className='App'>
      <Layout>
        <CalendarBuilder />
      </Layout>
    </div>      
  );
}

export default App;
