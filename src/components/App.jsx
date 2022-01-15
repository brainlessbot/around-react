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

/**
 * Represent application's entry component.
 *
 * @constructor
 * @return {JSX.Element}
 */
const App = () => {
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

    return (
        <div className="page">
            <Header/>

            <Main
                onAddCardClick={() => setIsCardAddPopupOpen(true)}
                onEditInfoClick={() => setIsProfileEditInfoPopupOpen(true)}
                onEditAvatarClick={() => setIsProfileEditAvatarPopupOpen(true)}
                onCardImageClick={(cardData) => {
                    setSelectedCard(cardData);
                    setIsImagePopupOpen(true);
                }}
                onCardLikeClick={(cardData, isLiked) => {
                    // TODO: Like/dislike handling
                }}
                onCardRemoveClick={(cardData) => {
                    setSelectedCard(cardData);
                    setIsCardRemovePopupOpen(true);
                }}
                handleErrorResponse={handleErrorResponse}
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
                    // TODO: Form submission
                    setIsCardRemovePopupOpen(false);
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
