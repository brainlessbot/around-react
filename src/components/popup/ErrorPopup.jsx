import PopupTemplate from './PopupTemplate';

/**
 * Represent an error popup.
 *
 * @constructor
 * @param {string} errorMessage
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 */
const ErrorPopup = ({errorMessage, isOpen, onCloseClick}) => {
    return (
        <PopupTemplate
            contentType="error"
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            isNotification={true}
        >
            {errorMessage}
        </PopupTemplate>
    );
};

export default ErrorPopup;
