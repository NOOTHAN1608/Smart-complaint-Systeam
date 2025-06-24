import logo from './logo.svg';
import Header from './components/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <Toaster />
     <div className='fixed shadow-md w-full h-16'>
    <Header/>
    <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
      <Outlet/></main>
    
    </div></>
    
   
    
  );
}

export default App;
