import { Box, Modal } from '@mui/material';
import { Button } from 'flowbite-react';
import React from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ResortModal = ({open, handleClose ,resortData}) => {
    console.log({resortData});
    return (
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <h2 className='text-xl font-bold text-center mb-5'>{resortData?.propertyName}</h2>
                    {/* <img src={resortData?.briefImage} alt="" /> */}
                    <h4 className='text-center text-lg'> {resortData?.region} {resortData?.country} {resortData?.district}</h4>
                    <button className='text-lg px-3 py-2 bg-green-600 text-white rounded-md '>Approve</button>
                </Box>
            </Modal>
    );
};

export default ResortModal;