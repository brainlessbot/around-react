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
    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={onFormSubmit}
            formSettings={{
                id: 'card-remove',
                title: 'Are you sure?',
                submitButton: 'Yes',
                isCompact: true
            }}
        />
    );
};

export default CardRemovePopup;
