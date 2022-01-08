import React from 'react';
import {combineClasses} from '../../utilities/helpers';

/**
 * Represent a basic dialogue template.
 *
 * @constructor
 * @param {string} contentType
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {boolean} isNotification
 * @param {JSX.Element[]} children
 * @return {JSX.Element}
 */
const DialogueTemplate = ({contentType, isOpen, onCloseClick, isNotification = false, children}) => {
    let timeoutId = undefined;

    // Handle closing the dialogue and remove timeout (if exists)
    const handleDialogueClosing = () => {
        timeoutId && clearTimeout(timeoutId);
        onCloseClick();
    };

    // Handle closing the dialogue if Escape button was pressed
    const handleEscKeydown = (event) => event.key === 'Escape' && handleDialogueClosing();

    React.useEffect(() => {
        // Allow closing the dialogue by pressing Escape button
        if (isOpen) {
            document.addEventListener('keydown', handleEscKeydown);
        }

        // Close notifications automatically after 3 seconds
        if (isOpen && isNotification) {
            timeoutId = setTimeout(handleDialogueClosing, 3000);
        }

        return () => document.removeEventListener('keydown', handleEscKeydown);
    }, [isOpen]);

    return (
        <div className={combineClasses(
            'dialogue',
            isOpen && 'dialogue_open',
            isNotification && 'dialogue_notification'
        )}>
            <div
                className="dialogue__overlay"
                onClick={handleDialogueClosing}
            />

            <div className={combineClasses(
                'dialogue__container',
                'dialogue__container_content_' + contentType
            )}>
                {!isNotification && (
                    <button
                        type="button"
                        title="Close dialogue"
                        className="dialogue__close-button"
                        onClick={handleDialogueClosing}
                    />
                )}

                {children}
            </div>
        </div>
    );
};

export default DialogueTemplate;
