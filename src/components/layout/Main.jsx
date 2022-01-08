import ProfileInfo from '../profile/ProfileInfo';
import ProfileCards from '../profile/ProfileCards';

/**
 * Represent the main-content section.
 *
 * @constructor
 * @param {Object} userData
 * @param {Object} cardsData
 * @param {Function} onAddCardClick
 * @param {Function} onEditInfoClick
 * @param {Function} onEditAvatarClick
 * @param {Function} onCardImageClick
 * @param {Function} onCardLikeClick
 * @param {Function} onCardRemoveClick
 * @param {boolean} isLoading
 * @return {JSX.Element}
 */
const Main = ({userData, cardsData, onAddCardClick, onEditInfoClick, onEditAvatarClick, onCardImageClick, onCardLikeClick, onCardRemoveClick, isLoading}) => {
    return (
        <main className="content page__content">
            {isLoading ? (
                <div className="content__loading-icon"/>
            ) : (
                <>
                    <ProfileInfo
                        userData={userData}
                        onAddCardClick={onAddCardClick}
                        onEditInfoClick={onEditInfoClick}
                        onEditAvatarClick={onEditAvatarClick}
                    />

                    <ProfileCards
                        userData={userData}
                        cardsData={cardsData}
                        onCardImageClick={onCardImageClick}
                        onCardLikeClick={onCardLikeClick}
                        onCardRemoveClick={onCardRemoveClick}
                    />
                </>
            )}
        </main>
    );
};

export default Main;
