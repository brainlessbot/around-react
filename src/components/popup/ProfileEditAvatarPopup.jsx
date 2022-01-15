import PopupWithForm from './PopupWithForm';

/**
 * Represent profile edit avatar popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const ProfileEditAvatarPopup = ({isOpen, onCloseClick, onFormSubmit}) => {
    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={onFormSubmit}
            formSettings={{
                id: 'profile-edit-avatar',
                title: 'Change Profile Picture',
                submitButton: 'Save'
            }}
        >
            <input
                name="avatar"
                type="url"
                placeholder="Avatar link"
                className="popup__form-field"
                autoComplete="off"
                required
            />
        </PopupWithForm>
    );
};

export default ProfileEditAvatarPopup;
