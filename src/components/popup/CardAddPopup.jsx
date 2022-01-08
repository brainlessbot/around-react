import PopupWithForm from './PopupWithForm';

/**
 * Represent card add popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const CardAddPopup = ({isOpen, onCloseClick, onFormSubmit}) => {
    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={onFormSubmit}
            formSettings={{
                id: 'card-add',
                title: 'New Card',
                fields: [
                    {
                        name: 'name',
                        type: 'text',
                        placeholder: 'Name',
                        minLength: 1,
                        maxLength: 30,
                        autoComplete: 'off',
                        required: true
                    },
                    {
                        name: 'link',
                        type: 'url',
                        placeholder: 'Image link',
                        autoComplete: 'off',
                        required: true
                    }
                ],
                submitButton: 'Save'
            }}
        />
    );
};

export default CardAddPopup;
