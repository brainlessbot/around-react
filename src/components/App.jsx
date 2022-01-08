import React from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import CardAddPopup from './popup/CardAddPopup';
import CardRemovePopup from './popup/CardRemovePopup';
import ProfileEditInfoPopup from './popup/ProfileEditInfoPopup';
import ProfileEditAvatarPopup from './popup/ProfileEditAvatarPopup';
import ImagePopup from './popup/ImagePopup';
import ErrorPopup from './popup/ErrorPopup';
import api from '../utilities/api';

/**
 * Represent application's entry component.
 *
 * @constructor
 * @return {JSX.Element}
 */
const App = () => {
    // Initialize API-data states
    const [userData, setUserData] = React.useState({});
    const [cardsData, setCardsData] = React.useState([]);

    // Initialize loading state
    const [isLoading, setIsLoading] = React.useState(true);

    // Initialize popup states
    const [isCardAddPopupOpen, setIsCardAddPopupOpen] = React.useState(false);
    const [isCardRemovePopupOpen, setIsCardRemovePopupOpen] = React.useState(false);
    const [isProfileEditInfoPopupOpen, setIsProfileEditInfoPopupOpen] = React.useState(false);
    const [isProfileEditAvatarPopupOpen, setIsProfileEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);

    // Initialize popup-related states
    const [selectedCard, setSelectedCard] = React.useState({});
    const [errorMessage, setErrorMessage] = React.useState(undefined);

    // Handle an error response from the server
    const handleErrorResponse = (error) => {
        setErrorMessage(error);
        setIsErrorPopupOpen(true);
    };

    // Update a specific card
    const updateCard = (cardId, updatedVersion) => setCardsData(
        cardsData.map((cardData) => cardId === cardData._id ? updatedVersion : cardData)
    );

    // Remove a specific card
    const removeCard = (cardId) => setCardsData(
        cardsData.filter((cardData) => cardId !== cardData._id)
    );

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

    // Apply global styles to page's body on mounting
    React.useEffect(() => document.body.classList.add('body'), []);

    return (
        <div className="page">
            <Header/>

            <Main
                userData={userData}
                cardsData={cardsData}
                onAddCardClick={() => setIsCardAddPopupOpen(true)}
                onEditInfoClick={() => setIsProfileEditInfoPopupOpen(true)}
                onEditAvatarClick={() => setIsProfileEditAvatarPopupOpen(true)}
                onCardImageClick={(cardData) => {
                    setSelectedCard(cardData);
                    setIsImagePopupOpen(true);
                }}
                onCardLikeClick={(cardData, isLiked) => {
                    const apiRequest = isLiked ? api.dislikeCard(cardData._id) : api.likeCard(cardData._id);
                    apiRequest
                        .then((response) => updateCard(cardData._id, response))
                        .catch(handleErrorResponse);
                }}
                onCardRemoveClick={(cardData) => {
                    setSelectedCard(cardData);
                    setIsCardRemovePopupOpen(true);
                }}
                isLoading={isLoading}
            />

            <Footer/>

            <CardAddPopup
                isOpen={isCardAddPopupOpen}
                onCloseClick={() => setIsCardAddPopupOpen(false)}
                onFormSubmit={() => {
                    // TODO: Form submission
                    setIsCardAddPopupOpen(false);
                }}
            />

            <CardRemovePopup
                isOpen={isCardRemovePopupOpen}
                onCloseClick={() => setIsCardRemovePopupOpen(false)}
                onFormSubmit={() => {
                    api.deleteCard(selectedCard._id)
                        .then(() => {
                            removeCard(selectedCard._id);
                            setIsCardRemovePopupOpen(false);
                        })
                        .catch(handleErrorResponse);
                }}
            />

            <ProfileEditInfoPopup
                isOpen={isProfileEditInfoPopupOpen}
                onCloseClick={() => setIsProfileEditInfoPopupOpen(false)}
                onFormSubmit={() => {
                    // TODO: Form submission
                    setIsProfileEditInfoPopupOpen(false);
                }}
            />

            <ProfileEditAvatarPopup
                isOpen={isProfileEditAvatarPopupOpen}
                onCloseClick={() => setIsProfileEditAvatarPopupOpen(false)}
                onFormSubmit={() => {
                    // TODO: Form submission
                    setIsProfileEditAvatarPopupOpen(false);
                }}
            />

            <ImagePopup
                isOpen={isImagePopupOpen}
                onCloseClick={() => setIsImagePopupOpen(false)}
                selectedCard={selectedCard}
            />

            <ErrorPopup
                isOpen={isErrorPopupOpen}
                onCloseClick={() => setIsErrorPopupOpen(false)}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default App;
