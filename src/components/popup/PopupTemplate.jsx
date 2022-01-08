import React from 'react';
import {combineClasses} from '../../utilities/helpers';

/**
 * Represent a basic popup template.
 *
 * @constructor
 * @param {string} contentType
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {boolean} isNotification
 * @param {JSX.Element[]} children
 * @return {JSX.Element}
 */
const PopupTemplate = ({contentType, isOpen, onCloseClick, isNotification = false, children}) => {
    let timeoutId = undefined;

    // Handle closing the popup and remove timeout (if exists)
    const handlePopupClosing = () => {
        timeoutId && clearTimeout(timeoutId);
        onCloseClick();
    };

    // Handle closing the popup if Escape button was pressed
    const handleEscKeydown = (event) => event.key === 'Escape' && handlePopupClosing();

    React.useEffect(() => {
        // Allow closing the popup by pressing Escape button
        if (isOpen) {
            document.addEventListener('keydown', handleEscKeydown);
        }

        // Close notifications automatically after 3 seconds
        if (isOpen && isNotification) {
            timeoutId = setTimeout(handlePopupClosing, 3000);
        }

        return () => document.removeEventListener('keydown', handleEscKeydown);
    }, [isOpen]);

    return (
        <div className={combineClasses(
            'popup',
            isOpen && 'popup_open',
            isNotification && 'popup_notification'
        )}>
            <div
                className="popup__overlay"
                onClick={handlePopupClosing}
            />

            <div className={combineClasses(
                'popup__container',
                'popup__container_content_' + contentType
            )}>
                {!isNotification && (
                    <button
                        type="button"
                        title="Close popup"
                        className="popup__close-button"
                        onClick={handlePopupClosing}
                    />
                )}

                {children}
            </div>
        </div>
    );
};

export default PopupTemplate;
