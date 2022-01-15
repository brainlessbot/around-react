import React from 'react';
import ProfileInfo from '../profile/ProfileInfo';
import ProfileCards from '../profile/ProfileCards';
import api from '../../utilities/api';

/**
 * Represent the main-content section.
 *
 * @constructor
 * @param {Function} onAddCardClick
 * @param {Function} onEditInfoClick
 * @param {Function} onEditAvatarClick
 * @param {Function} onCardImageClick
 * @param {Function} onCardLikeClick
 * @param {Function} onCardRemoveClick
 * @param {Function} handleErrorResponse
 * @return {JSX.Element}
 */
const Main = ({onAddCardClick, onEditInfoClick, onEditAvatarClick, onCardImageClick, onCardLikeClick, onCardRemoveClick, handleErrorResponse}) => {
    // Initialize API-data states
    const [userData, setUserData] = React.useState({});
    const [cardsData, setCardsData] = React.useState([]);

    // Initialize loading state
    const [isLoading, setIsLoading] = React.useState(true);

    // Load data from API on mounting
    React.useEffect(() => {
        Promise
            .all([api.getUserInfo(), api.getAllCards()])
            .then(([userResponse, cardsResponse]) => {
                setUserData(userResponse);
                setCardsData(cardsResponse);
                setIsLoading(false);
            })
            .catch(handleErrorResponse);
    }, []);

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
