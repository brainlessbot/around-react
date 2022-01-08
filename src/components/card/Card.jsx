import {combineClasses} from '../../utilities/helpers';

/**
 * Represent a card element.
 *
 * @constructor
 * @param {Object} cardData
 * @param {Object} userData
 * @param {Function} onCardImageClick
 * @param {Function} onCardLikeClick
 * @param {Function} onCardRemoveClick
 * @return {JSX.Element}
 */
const Card = ({cardData, userData, onCardImageClick, onCardLikeClick, onCardRemoveClick}) => {
    // Whether the current user is the owner of the card
    const isOwner = cardData.owner._id === userData._id;

    // Whether the current user has liked the card
    const isLiked = cardData.likes.some((likingUser) => likingUser._id === userData._id);

    // Event handlers
    const handleCardImageClick = () => onCardImageClick(cardData);
    const handleCardLikeClick = () => onCardLikeClick(cardData, isLiked);
    const handleCardRemoveClick = () => onCardRemoveClick(cardData);

    return (
        <li className="card">
            <div className="card__image-container">
                <img
                    src={cardData.link}
                    alt={cardData.name}
                    className="card__image-element"
                    onClick={handleCardImageClick}
                />

                {isOwner && (
                    <button
                        type="button"
                        title="Remove"
                        className="card__remove-button"
                        onClick={handleCardRemoveClick}
                    />
                )}
            </div>

            <div className="card__details-container">
                <h2 className="card__title">{cardData.name}</h2>

                <div className="card__like-container">
                    <button
                        type="button"
                        title={isLiked ? 'Dislike' : 'Like'}
                        className={combineClasses(
                            'card__like-button',
                            isLiked && 'card__like-button_active'
                        )}
                        onClick={handleCardLikeClick}
                    />

                    <div className="card__like-counter">{cardData.likes.length}</div>
                </div>
            </div>
        </li>
    );
};

export default Card;
