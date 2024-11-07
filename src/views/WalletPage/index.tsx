"use client";

import React, { useState, useEffect} from "react";
import ContentCard from "../../atoms/ContentCard";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import AddModal from "../../atoms/AddModal";
import axios from 'axios';

interface ExpenseItem {
    category: string;
    wallet: string;
    amount: number;
    title: string;
    flowType: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Wallet {
    _id: string;
    name: string;
    expenseItems: ExpenseItem[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

const WalletPage = ({ walletData, categoryData }) => {

    const { id } = useParams();
    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
    const [addModal, setAddModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        amount: 0,
        wallet: id,
        category: '',
        flowType: 'outcome' 
      });

    const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('https://digistar-demo-be.vercel.app/api/expense-items', {
            title: formData.title,
            amount: formData.amount,
            wallet: id,
            category: formData.category,
            flowType: formData.flowType
        });

        console.log('Data berhasil dikirim:', response.data);
        } catch (error) {
        console.error('Error mengirim data:', error);
        }
        setAddModal(false);
      };

    const modalContent = (
        <>
          <div className="mb-5">
            <div className="flex items-center mb-4">
                <input id="default-radio-1" type="radio" value="income" name="flowType" checked={formData.flowType === "income"} onChange={handleInputChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Income</label>
            </div>
            <div className="flex items-center mb-4">
                <input id="default-radio-2" type="radio" value="outcome" name="flowType" checked={formData.flowType === "outcome"} onChange={handleInputChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Outcome</label>
            </div>
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Item</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a category</label>
            <select
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.category} 
                onChange={handleInputChange}
            >
                <option value="" disabled>
                Choose a category
                </option>
                {categoryData
                .filter((category) => {
                    if (!id) return true;
                    return category.wallet && category.wallet._id === id;
                })
                .map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
                ))}
            </select>
        </div>
        </>
      );

    useEffect(() => {
        const wallet = walletData.find(wallet => wallet._id === id);
        setSelectedWallet(wallet);
      }, [id, walletData]);

      const calculateTotalAmount = (expenseItems) => {
        return expenseItems.reduce((total, item) => {
          return item.flowType === "income" ? total + item.amount : total - item.amount;
        }, 0);
      };
    
      if (!selectedWallet) {
        return <div>Loading...</div>;
      }
    
      const totalAmount = calculateTotalAmount(selectedWallet.expenseItems);
    
  return (
  <>
    <div className="max-h-full px-6 overflow-y-auto dark:bg-gray-800">
        <div className="">
            <div className="flex flex-wrap">
                <h1 className="text-2xl w-2/3 font-bold tracking-tight text-gray-900 dark:text-white">{selectedWallet.name}</h1>
                <p className={`text-end text-xl font-semibold w-1/3 ${totalAmount <= 0 ? 'text-[#E14942]' : 'text-[#27CA40]'} `}>
                    Rp.{totalAmount.toLocaleString('id-ID')}
                </p>
            </div>
        </div>
        <div className="pt-4 mt-2 max-h-full overflow-y-scroll no-scrollbar">
            {selectedWallet.expenseItems.map((expense, index) => (
            <ContentCard
                key={index}
                headingText={expense.title}
                price={`Rp.${expense.amount.toLocaleString('id-ID')}`}
                date={new Date(expense.createdAt).toLocaleDateString('id-ID')}
                type={expense.flowType}
                id={expense._id}
            />
            ))}
        </div>
        <button type="button" onClick={() => setAddModal(true)} className="text-gray-900 fixed bottom-16 right-16 bg-[#FFC130] border border-[#ffffff] focus:outline-none hover:bg-gray-100 hover: hover:border-[#FFC130  ] focus:ring-4 focus:ring-gray-100 font-medium rounded-3xl text-sm p-3  me-2 mb-2">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"fill='#ffffff'><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </button>
    </div>
    <AddModal
        stateOpen={addModal}
        setStateOpen={setAddModal}
        content={modalContent}
        onSubmit={handleSubmit}
      />
  </>
  )
};

WalletPage.propTypes = {
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
    ).isRequired
  };

export default WalletPage;
