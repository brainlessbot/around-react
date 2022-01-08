import DialogueWithForm from './DialogueWithForm';

/**
 * Represent card remove dialogue.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const CardRemoveDialogue = ({isOpen, onCloseClick, onFormSubmit}) => {
    return (
        <DialogueWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={onFormSubmit}
            formSettings={{
                id: 'card-remove',
                title: 'Are you sure?',
                fields: [],
                submitButton: 'Yes'
            }}
        />
    );
};

export default CardRemoveDialogue;
