"use client";
import PropTypes from 'prop-types'
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarCard = ({ headingText, price, href }) => {
  return (
    <Link to={href}>
      <div className="block my-1 px-3 py-2 bg-[#FDD71D] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{headingText}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{price}</p>
      </div>
    </Link>
  );
};

SidebarCard.propTypes = {
    headingText: PropTypes.string.isRequired,
    price: PropTypes.string,
    href: PropTypes.string,
  };

SidebarCard.defaultProps = {
  href: "/"
};

export default SidebarCard;
