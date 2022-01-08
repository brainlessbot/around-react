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
                fields: [
                    {
                        name: 'avatar',
                        type: 'url',
                        placeholder: 'Avatar link',
                        autoComplete: 'off',
                        required: true
                    }
                ],
                submitButton: 'Save'
            }}
        />
    );
};

export default ProfileEditAvatarPopup;
