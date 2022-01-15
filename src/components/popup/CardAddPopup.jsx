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
                submitButton: 'Save'
            }}
        >
            <input
                name="name"
                type="text"
                placeholder="Name"
                className="popup__form-field"
                minLength={1}
                maxLength={30}
                autoComplete="off"
                required
            />

            <input
                name="link"
                type="url"
                placeholder="Image link"
                className="popup__form-field"
                autoComplete="off"
                required
            />
        </PopupWithForm>
    );
};

export default CardAddPopup;
