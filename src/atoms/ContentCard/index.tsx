"use client";
import PropTypes from 'prop-types'
import React from 'react';
import DeleteModal from '../DeleteModal';
import UpdateModal from '../UpdateModal';
import axios from 'axios';
import { useState } from 'react';

const ContentCard = ({ headingText, price, date, type, id }) => {
    const [deletModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [formData, setFormData] = useState({
        amount: price,
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
        const response = await axios.delete(`https://digistar-demo-be.vercel.app/api/expense-items/${id}`);

        console.log('Data berhasil dikirim:', response.data);
        } catch (error) {
        console.error('Error mengirim data:', error);
        }
        setDeleteModal(false);
      };

    const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.put(`https://digistar-demo-be.vercel.app/api/expense-items/${id}`, {
        amount: formData.amount,
    });

    console.log('Data berhasil dikirim:', response.data);
    } catch (error) {
    console.error('Error mengirim data:', error);
    }
    setUpdateModal(false);
    };

    const modalContent = (
        <>
          <div className="mb-5 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            <h6>Anda akan menghapus item {headingText}!</h6>
        </div>
        </>
      );
    
      const updateModalContent = (
        <>
          <div className="mb-5">
            <div className="mb-5 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                <h6>Anda akan mengubah item {headingText}!</h6>
            </div>
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        </>
      );
  return (
    <>
        <div onClick={() => {setUpdateModal(true);}} className="block w-full my-2 bg-white border border-gray-200 rounded-lg shadow px-6 py-3 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex flex-wrap">
                <h5 className="text-xl w-2/3 font-bold tracking-tight text-gray-900 dark:text-white">
                    {headingText}
                </h5>
                <p className="text-end font-light w-1/3 text-gray-700 dark:text-gray-400">
                {date}
                </p>
                {type === 'income' ? (
                    <p className="font-normal w-2/3 text-[#27CA40] dark:text-gray-400">
                        {price}
                    </p>
                    ) : (
                    <p className="font-normal w-2/3 text-[#E14942] dark:text-gray-400">
                        {price}
                    </p>
                )}
                <div className="text-end font-light w-1/3 text-gray-700 dark:text-gray-400">
                    <button type="button" onClick={() => {setDeleteModal(true);}} className="focus:outline-none text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill='#E14942' viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <DeleteModal
            stateOpen={deletModal}
            setStateOpen={setDeleteModal}
            content={modalContent}
            onSubmit={handleSubmit}
        />
        <UpdateModal
            stateOpen={updateModal}
            setStateOpen={setUpdateModal}
            content={updateModalContent}
            onSubmit={handleSubmitUpdate}
        />
    </>
  );
};

ContentCard.propTypes = {
    headingText: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

export default ContentCard;
