import DialogueTemplate from './DialogueTemplate';

/**
 * Represent a card view dialogue.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Object} selectedCard
 */
const CardViewDialogue = ({isOpen, onCloseClick, selectedCard}) => {
    return (
        <DialogueTemplate
            contentType="image"
            isOpen={isOpen}
            onCloseClick={onCloseClick}
        >
            <img
                src={selectedCard.link}
                alt={selectedCard.name}
                className="dialogue__image"
            />

            <p className="dialogue__caption">{selectedCard.name}</p>
        </DialogueTemplate>
    );
};

export default CardViewDialogue;
