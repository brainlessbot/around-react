import PopupTemplate from './PopupTemplate';

/**
 * Represent a card view popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Object} selectedCard
 */
const ImagePopup = ({isOpen, onCloseClick, selectedCard}) => {
    return (
        <PopupTemplate
            contentType="image"
            isOpen={isOpen}
            onCloseClick={onCloseClick}
        >
            <img
                src={selectedCard.link}
                alt={selectedCard.name}
                className="popup__image"
            />

            <p className="popup__caption">{selectedCard.name}</p>
        </PopupTemplate>
    );
};

export default ImagePopup;
