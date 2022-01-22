import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import RemovePlacePopup from './RemovePlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import ErrorPopup from './ErrorPopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';

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
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
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
    const handleAddCardClick = () => setIsAddPlacePopupOpen(true);

    // Handle opening the profile-edit-info popup
    const handleEditInfoClick = () => setIsEditProfilePopupOpen(true);

    // Handle opening the profile-edit-avatar popup
    const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

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
        setIsRemovePlacePopupOpen(true);
    };

    /*
     * ----------------------------------------------------------------
     * Popup Component Functions
     * ----------------------------------------------------------------
     */

    // Handle closing the card-add popup
    const handleCardAddCloseClick = () => setIsAddPlacePopupOpen(false);

    // Handle form submission in card-add popup
    const handleCardAddFormSubmit = (inputValues, onServerResponse) => {
        api.addCard(inputValues)
            .then((response) => {
                addCard(response);
                setIsAddPlacePopupOpen(false);
            })
            .catch(handleErrorResponse)
            .finally(onServerResponse);
    };

    // Handle closing the card-remove popup
    const handleCardRemoveCloseClick = () => setIsRemovePlacePopupOpen(false);

    // Handle form submission in card-remove popup
    const handleCardRemoveFormSubmit = (onServerResponse) => {
        api.deleteCard(selectedCard._id)
            .then(() => {
                removeCard(selectedCard);
                setIsRemovePlacePopupOpen(false);
            })
            .catch(handleErrorResponse)
            .finally(onServerResponse);
    };

    // Handle closing the profile-edit-info popup
    const handleProfileEditInfoCloseClick = () => setIsEditProfilePopupOpen(false);

    // Handle form submission in profile-edit-info popup
    const handleProfileEditInfoFormSubmit = (inputValues, onServerResponse) => {
        api.updateUserInfo(inputValues)
            .then((response) => {
                setUserData(response);
                setIsEditProfilePopupOpen(false);
            })
            .catch(handleErrorResponse)
            .finally(onServerResponse);
    };

    // Handle closing the profile-edit-avatar popup
    const handleProfileEditAvatarCloseClick = () => setIsEditAvatarPopupOpen(false);

    // Handle form submission in profile-edit-avatar popup
    const handleProfileEditAvatarFormSubmit = (inputValues, onServerResponse) => {
        api.updateUserAvatar(inputValues)
            .then((response) => {
                setUserData(response);
                setIsEditAvatarPopupOpen(false);
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

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onCloseClick={handleCardAddCloseClick}
                    onFormSubmit={handleCardAddFormSubmit}
                />

                <RemovePlacePopup
                    isOpen={isRemovePlacePopupOpen}
                    onCloseClick={handleCardRemoveCloseClick}
                    onFormSubmit={handleCardRemoveFormSubmit}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onCloseClick={handleProfileEditInfoCloseClick}
                    onFormSubmit={handleProfileEditInfoFormSubmit}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
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
