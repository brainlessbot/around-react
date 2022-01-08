import DialogueWithForm from './DialogueWithForm';

/**
 * Represent profile edit info dialogue.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const ProfileEditInfoDialogue = ({isOpen, onCloseClick, onFormSubmit}) => {
    return (
        <DialogueWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={onFormSubmit}
            formSettings={{
                id: 'profile-edit-info',
                title: 'Edit Profile',
                fields: [
                    {
                        name: 'name',
                        type: 'text',
                        placeholder: 'Name',
                        minLength: 2,
                        maxLength: 40,
                        autoComplete: 'off',
                        required: true
                    },
                    {
                        name: 'about',
                        type: 'text',
                        placeholder: 'About',
                        minLength: 2,
                        maxLength: 200,
                        autoComplete: 'off',
                        required: true
                    }
                ],
                submitButton: 'Save'
            }}
        />
    );
};

export default ProfileEditInfoDialogue;
