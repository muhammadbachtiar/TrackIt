"use client";
import HeadingWithButton from "../../atoms/HeadingandButton";
import SidebarCard from "../../atoms/SidebarCard";
import PropTypes from 'prop-types';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function AppSideBar({ walletData, categoryData }) {
    const {id} = useParams();
    const [addWalletModal, setAddWalletModal] = useState(false);
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [formWalletData, setFormWalletData] = useState({
        name: '', 
      });
    const [formCategoriesData, setFormCategoriesData] = useState({
        wallet: id,
        name: '', 
      });

    const handleInputNameWalletChange = (e) => {
    setFormWalletData({
        ...addWalletModal,
        [e.target.name]: e.target.value,
    });
    };

    const handleInputCategoriesChange = (e) => {
        setFormCategoriesData({
            ...formCategoriesData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitAddWallet = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('https://digistar-demo-be.vercel.app/api/wallets', {
            name: formWalletData.name,
        });

        console.log('Data berhasil dikirim:', response.data);
        } catch (error) {
        console.error('Error mengirim data:', error);
        }
        setAddWalletModal(false);
      };

    const handleSubmitAddCategory = async (e) => {
        e.preventDefault();

        try {
            console.log({
                wallet: formCategoriesData.wallet,
                name: formCategoriesData.name,
            })
        const response = await axios.post('https://digistar-demo-be.vercel.app/api/categories', {
            wallet: formCategoriesData.wallet,
            name: formCategoriesData.name,
        });

        console.log('Data berhasil dikirim:', response.data);
        } catch (error) {
        console.error('Error mengirim data:', error);
        }
        setAddCategoryModal(false);
    }

    const modalWalletContent = (
        <>
          <div className="mb-5">
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama wallet</label>
            <input type="text" name="name" value={formWalletData.name} onChange={handleInputNameWalletChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        </>
      );
    
    const modalCategoryContent = (
        <>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama category</label>
                <input type="text" name="name" value={formCategoriesData.name} onChange={handleInputCategoriesChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a wallet</label>
            <select
                id="walletSelect"
                name="wallet"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formCategoriesData.wallet} 
                onChange={handleInputCategoriesChange}
            >
                <option value="" disabled>
                Choose a wallet
                </option>
                {walletData.map((wallet) => (
                <option key={wallet._id} value={wallet._id} selected={formCategoriesData.wallet === wallet._id}>
                    {wallet.name}
                </option>
                ))}
            </select>
        </>
    );

    useEffect (() => {}, [id, formCategoriesData.wallet])

  return (
    <>
        <aside id="separator-sidebar" className="z-40 w-1/5 h-screen" aria-label="Sidebar">
            <div className="h-full px-3 pt-4 overflow-y-auto bg-white dark:bg-gray-800">
                <div className="pt-3">
                    <HeadingWithButton headingText="Wallets" stateOpen={addWalletModal} setStateOpen={setAddWalletModal} content={modalWalletContent} onSubmit={handleSubmitAddWallet}/>
                </div>
                <div className="pt-4 mt-2 max-h-60 overflow-y-scroll no-scrollbar">
                    {walletData.map((wallet, index) => {
                        const totalAmount = wallet.expenseItems.reduce((total, item) => {
                        if (item.flowType === "income") {
                            return total + item.amount;
                        } else if (item.flowType === "outcome") {
                            return total - item.amount;
                        }
                        return total;
                        }, 0);

                        return (
                        <SidebarCard
                            key={index}
                            headingText={wallet.name} 
                            price={`Rp.${totalAmount.toLocaleString()}`}
                            href={`/wallet/${wallet._id}`}
                        />
                        );
                    })}
                </div>
                <div className="pt-4 mt-4 space-y-2 font-medium border-t">
                    <HeadingWithButton headingText="Categories" stateOpen={addCategoryModal} setStateOpen={setAddCategoryModal} content={modalCategoryContent} onSubmit={handleSubmitAddCategory}/> 
                </div>
                <div className="pt-4 mt-2 max-h-60 overflow-y-scroll no-scrollbar">
                {categoryData
                    .filter((category) => {
                        if (!id) return true;
                        return category.wallet && category.wallet._id === id;
                    })
                    .map((category, index) => {
                        return (
                        <SidebarCard
                            key={index}
                            headingText={category.name}
                        />
                        );
                    })}
                </div>
            </div>
        </aside>
    </>
  )
}

AppSideBar.propTypes = {
    walletData: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        expenseItems: PropTypes.arrayOf(
          PropTypes.shape({
            category: PropTypes.string.isRequired,
            wallet: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            flowType: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            __v: PropTypes.number.isRequired,
          })
        ),
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
      })
    ).isRequired,
    categoryData: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          wallet: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
          ),
          createdAt: PropTypes.string.isRequired,
          updatedAt: PropTypes.string.isRequired,
          __v: PropTypes.number.isRequired,
        })
      ).isRequired,
  };
  

export default AppSideBar
