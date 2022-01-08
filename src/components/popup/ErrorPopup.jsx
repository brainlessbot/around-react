import PopupTemplate from './PopupTemplate';

/**
 * Represent an error popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {string} errorMessage
 */
const ErrorPopup = ({isOpen, onCloseClick, errorMessage}) => {
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
