import React from 'react';
import DialogueTemplate from './DialogueTemplate';
import {combineClasses} from '../../utilities/helpers';

/**
 * Represent a basic dialogue with a form.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @param {Object} formSettings
 * @return {JSX.Element}
 */
const DialogueWithForm = ({isOpen, onCloseClick, onFormSubmit, formSettings}) => {
    // If the form has no fields, it'll be rendered with a compact design
    const isCompact = !formSettings.fields.length;

    // Handle the submission of the form
    const handleFormSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
    };

    return (
        <DialogueTemplate
            contentType="form"
            isOpen={isOpen}
            onCloseClick={onCloseClick}
        >
            <h2 className={combineClasses(
                'dialogue__title',
                isCompact && 'dialogue__title_compact'
            )}>
                {formSettings.title}
            </h2>

            <form
                id={formSettings.id}
                className="dialogue__form"
                onSubmit={handleFormSubmit}
                noValidate
            >
                {formSettings.fields.map((fieldSettings) => (
                    <input
                        key={fieldSettings.name}
                        className="dialogue__form-field"
                        {...fieldSettings}
                    />
                ))}
                <button
                    type="submit"
                    className={combineClasses(
                        'dialogue__submit-button',
                        isCompact && 'dialogue__submit-button_compact'
                    )}
                >
                    {formSettings.submitButton}
                </button>
            </form>
        </DialogueTemplate>
    );
};

export default DialogueWithForm;
