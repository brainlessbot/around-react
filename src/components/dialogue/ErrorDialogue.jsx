import DialogueTemplate from './DialogueTemplate';

/**
 * Represent an error dialogue.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {string} errorMessage
 */
const ErrorDialogue = ({isOpen, onCloseClick, errorMessage}) => {
    return (
        <DialogueTemplate
            contentType="error"
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            isNotification={true}
        >
            {errorMessage}
        </DialogueTemplate>
    );
};

export default ErrorDialogue;
