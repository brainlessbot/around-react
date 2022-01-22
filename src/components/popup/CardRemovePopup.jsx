import React from 'react';
import PopupWithForm from './PopupWithForm';

/**
 * Represent card remove popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const CardRemovePopup = ({isOpen, onCloseClick, onFormSubmit}) => {
    // Initialize processing state
    const [isProcessing, setIsProcessing] = React.useState(false);

    // Handle the submission of the form
    const handleFormSubmit = () => {
        setIsProcessing(true);
        onFormSubmit(() => setIsProcessing(false));
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={handleFormSubmit}
            formSettings={{
                id: 'card-remove',
                title: 'Are you sure?',
                submitButton: 'Yes',
                isCompact: true
            }}
            isProcessing={isProcessing}
        />
    );
};

export default CardRemovePopup;
