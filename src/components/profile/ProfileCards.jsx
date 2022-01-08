import Card from '../card/Card';

/**
 * Represent the profile-cards section.
 *
 * @constructor
 * @param {Object} userData
 * @param {Object} cardsData
 * @param {Function} onCardImageClick
 * @param {Function} onCardLikeClick
 * @param {Function} onCardRemoveClick
 * @return {JSX.Element}
 */
const ProfileCards = ({userData, cardsData, onCardImageClick, onCardLikeClick, onCardRemoveClick}) => {
    return (
        <section className="profile-cards content__profile-cards">
            <ul className="profile-cards__list">
                {cardsData.map((cardData) => (
                    <Card
                        key={cardData._id}
                        cardData={cardData}
                        userData={userData}
                        onCardImageClick={onCardImageClick}
                        onCardLikeClick={onCardLikeClick}
                        onCardRemoveClick={onCardRemoveClick}
                    />
                ))}
            </ul>
        </section>
    );
};

export default ProfileCards;