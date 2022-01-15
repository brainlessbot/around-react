import PopupWithForm from './PopupWithForm';

/**
 * Represent profile edit info popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const ProfileEditInfoPopup = ({isOpen, onCloseClick, onFormSubmit}) => {
    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={onFormSubmit}
            formSettings={{
                id: 'profile-edit-info',
                title: 'Edit Profile',
                submitButton: 'Save'
            }}
        >
            <input
                name="name"
                type="text"
                placeholder="Name"
                className="popup__form-field"
                minLength={2}
                maxLength={40}
                autoComplete="off"
                required
            />

            <input
                name="about"
                type="text"
                placeholder="About"
                className="popup__form-field"
                minLength={2}
                maxLength={200}
                autoComplete="off"
                required
            />
        </PopupWithForm>
    );
};

export default ProfileEditInfoPopup;
