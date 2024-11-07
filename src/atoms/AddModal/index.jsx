import { Modal, Button } from 'flowbite-react';
import PropTypes from 'prop-types';

const CustomModal = ({ stateOpen, setStateOpen, content, onSubmit }) => {
  return (
    <Modal show={stateOpen} onClose={() => setStateOpen(false)}>
      <Modal.Header>Tambah Data</Modal.Header>
        <form onSubmit={onSubmit}>
            <Modal.Body>
                <div className="space-y-6">
                    {content}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" className='bg-[#FFC130] hover:bg-gray-300'>Simpan</button>
                <Button color="gray" type="button" onClick={() => setStateOpen(false)}>
                    Tutup
                </Button>
            </Modal.Footer>
        </form>
    </Modal>
  );
};

CustomModal.propTypes = {
  stateOpen: PropTypes.bool.isRequired,
  setStateOpen: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomModal;