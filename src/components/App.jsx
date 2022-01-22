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
import CurrentUserContext from '../contexts/CurrentUserContext';
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

    /*
     * ----------------------------------------------------------------
     * General Functions
     * ----------------------------------------------------------------
     */

    // Add a new card
    const addCard = (newCardData) => setCardsData(
        [newCardData, ...cardsData]
    );

    // Update a specific card
    const updateCard = (updatedCardData) => setCardsData(
        cardsData.map((cardData) => updatedCardData._id === cardData._id ? updatedCardData : cardData)
    );

    // Remove a specific card
    const removeCard = (removedCardData) => setCardsData(
        cardsData.filter((cardData) => removedCardData._id !== cardData._id)
    );

    // Handle an error response from the server
    const handleErrorResponse = (errorMessage) => {
        setErrorMessage(errorMessage);
        setIsErrorPopupOpen(true);
    };

    /*
     * ----------------------------------------------------------------
     * Main Component Functions
     * ----------------------------------------------------------------
     */

    // Handle opening the card-add popup
    const handleAddCardClick = () => setIsCardAddPopupOpen(true);

    // Handle opening the profile-edit-info popup
    const handleEditInfoClick = () => setIsProfileEditInfoPopupOpen(true);

    // Handle opening the profile-edit-avatar popup
    const handleEditAvatarClick = () => setIsProfileEditAvatarPopupOpen(true);

    // Handle opening the image popup
    const handleCardImageClick = (cardData) => {
        setSelectedCard(cardData);
        setIsImagePopupOpen(true);
    };

    // Handle card liking/disliking
    const handleCardLikeClick = (cardData, isLiked) =>
        (isLiked ? api.dislikeCard(cardData._id) : api.likeCard(cardData._id))
            .then(updateCard)
            .catch(handleErrorResponse);

    // Handle opening the card-remove popup
    const handleCardRemoveClick = (cardData) => {
        setSelectedCard(cardData);
        setIsCardRemovePopupOpen(true);
    };

    /*
     * ----------------------------------------------------------------
     * Popup Component Functions
     * ----------------------------------------------------------------
     */

    // Handle closing the card-add popup
    const handleCardAddCloseClick = () => setIsCardAddPopupOpen(false);

    // Handle form submission in card-add popup
    const handleCardAddFormSubmit = (inputValues, onServerResponse) => {
        api.addCard(inputValues)
            .then((response) => {
                addCard(response);
                setIsCardAddPopupOpen(false);
            })
            .catch(handleErrorResponse)
            .finally(onServerResponse);
    };

    // Handle closing the card-remove popup
    const handleCardRemoveCloseClick = () => setIsCardRemovePopupOpen(false);

    // Handle form submission in card-remove popup
    const handleCardRemoveFormSubmit = (onServerResponse) => {
        api.deleteCard(selectedCard._id)
            .then(() => {
                removeCard(selectedCard);
                setIsCardRemovePopupOpen(false);
            })
            .catch(handleErrorResponse)
            .finally(onServerResponse);
    };

    // Handle closing the profile-edit-info popup
    const handleProfileEditInfoCloseClick = () => setIsProfileEditInfoPopupOpen(false);

    // Handle form submission in profile-edit-info popup
    const handleProfileEditInfoFormSubmit = (inputValues, onServerResponse) => {
        api.updateUserInfo(inputValues)
            .then((response) => {
                setUserData(response);
                setIsProfileEditInfoPopupOpen(false);
            })
            .catch(handleErrorResponse)
            .finally(onServerResponse);
    };

    // Handle closing the profile-edit-avatar popup
    const handleProfileEditAvatarCloseClick = () => setIsProfileEditAvatarPopupOpen(false);

    // Handle form submission in profile-edit-avatar popup
    const handleProfileEditAvatarFormSubmit = (inputValues, onServerResponse) => {
        api.updateUserAvatar(inputValues)
            .then((response) => {
                setUserData(response);
                setIsProfileEditAvatarPopupOpen(false);
            })
            .catch(handleErrorResponse)
            .finally(onServerResponse);
    };

    // Handle closing the image popup
    const handleImageCloseClick = () => setIsImagePopupOpen(false);

    // Handle closing the error popup
    const handleErrorCloseClick = () => setIsErrorPopupOpen(false);

    /*
     * ----------------------------------------------------------------
     * Side Effects
     * ----------------------------------------------------------------
     */

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
        <CurrentUserContext.Provider value={userData}>
            <div className="page">
                <Header/>

                <Main
                    cardsData={cardsData}
                    onAddCardClick={handleAddCardClick}
                    onEditInfoClick={handleEditInfoClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardImageClick={handleCardImageClick}
                    onCardLikeClick={handleCardLikeClick}
                    onCardRemoveClick={handleCardRemoveClick}
                    isLoading={isLoading}
                />

                <Footer/>

                <CardAddPopup
                    isOpen={isCardAddPopupOpen}
                    onCloseClick={handleCardAddCloseClick}
                    onFormSubmit={handleCardAddFormSubmit}
                />

                <CardRemovePopup
                    isOpen={isCardRemovePopupOpen}
                    onCloseClick={handleCardRemoveCloseClick}
                    onFormSubmit={handleCardRemoveFormSubmit}
                />

                <ProfileEditInfoPopup
                    isOpen={isProfileEditInfoPopupOpen}
                    onCloseClick={handleProfileEditInfoCloseClick}
                    onFormSubmit={handleProfileEditInfoFormSubmit}
                />

                <ProfileEditAvatarPopup
                    isOpen={isProfileEditAvatarPopupOpen}
                    onCloseClick={handleProfileEditAvatarCloseClick}
                    onFormSubmit={handleProfileEditAvatarFormSubmit}
                />

                <ImagePopup
                    selectedCard={selectedCard}
                    isOpen={isImagePopupOpen}
                    onCloseClick={handleImageCloseClick}
                />

                <ErrorPopup
                    errorMessage={errorMessage}
                    isOpen={isErrorPopupOpen}
                    onCloseClick={handleErrorCloseClick}
                />
            </div>
        </CurrentUserContext.Provider>
    );
};

export default App;
