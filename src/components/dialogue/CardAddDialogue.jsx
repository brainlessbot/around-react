import DialogueWithForm from './DialogueWithForm';

/**
 * Represent card add dialogue.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const CardAddDialogue = ({isOpen, onCloseClick, onFormSubmit}) => {
    return (
        <DialogueWithForm
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

export default CardAddDialogue;
