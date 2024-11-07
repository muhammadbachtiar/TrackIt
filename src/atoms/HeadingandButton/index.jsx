import PropTypes from 'prop-types'
import CustomModal from '../AddModal';

const HeadingWithButton = ({ headingText, stateOpen, setStateOpen, content, onSubmit }) => {


  return (
    <>
      <div className="flex items-center justify-between space-x-4 px-2">
        <h2 className="text-xl font-bold dark:text-white flex-grow">
          {headingText}
        </h2>
        <button
          type="button"
          onClick={() => setStateOpen(true)}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 hover:border-[#F4CE14] focus:ring-4 focus:ring-[#F4CE14] rounded-lg px-3 py-2.5"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"fill='#5F6368'><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </button>
      </div>
      <CustomModal
        stateOpen={stateOpen}
        setStateOpen={setStateOpen}
        content={content}
        onSubmit={onSubmit}
      />
    </>
    
  );
};

HeadingWithButton.propTypes = {
    headingText: PropTypes.string.isRequired,
    stateOpen: PropTypes.bool.isRequired,
    setStateOpen: PropTypes.func.isRequired,
    content: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

export default HeadingWithButton;
