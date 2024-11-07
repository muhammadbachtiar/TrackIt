import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AppSideBar from '../components/Sidebar';
import MainPage from '../views/MainPage';
import WalletPage from '../views/WalletPage';

const DefaultLayout = () => {

  const { pathname } = useLocation();
  const [walletData, setWalletData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  let contentComponent;

  switch (true) {
    case pathname ===  "/":
      contentComponent = <MainPage />;
      break;
    case pathname.includes("/wallet"):
      contentComponent = <WalletPage walletData={walletData} categoryData={categoryData}/>;
      break;
  }

  const fetchDataWallets = async () => {
    try {
      const response = await axios.get('https://digistar-demo-be.vercel.app/api/wallets');
      setWalletData(response.data.data);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const fetchDataCategories = async () => {
    try {
      const response = await axios.get('https://digistar-demo-be.vercel.app/api/categories');
      setCategoryData(response.data.data);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };


  useEffect(() => {
    fetchDataWallets();
    fetchDataCategories();
  }, []);
  
  return (
    <div className='min-h-screen'>
      <AppHeader />
        <div className="flex flex-wrap">
            <AppSideBar walletData={walletData} categoryData={categoryData}/>
          <div className="flex-grow py-5 bg-[#F5F7F8]">
            <div className='mx-10'>
              {contentComponent}
            </div>
          </div>
        </div>
    </div>
  );
};

export default DefaultLayout;