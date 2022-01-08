import DialogueWithForm from './DialogueWithForm';

/**
 * Represent profile edit avatar dialogue.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const ProfileEditAvatarDialogue = ({isOpen, onCloseClick, onFormSubmit}) => {
    return (
        <DialogueWithForm
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

export default ProfileEditAvatarDialogue;
