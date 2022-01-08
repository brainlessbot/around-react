import React from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import CardAddDialogue from './dialogue/CardAddDialogue';
import CardViewDialogue from './dialogue/CardViewDialogue';
import CardRemoveDialogue from './dialogue/CardRemoveDialogue';
import ProfileEditInfoDialogue from './dialogue/ProfileEditInfoDialogue';
import ProfileEditAvatarDialogue from './dialogue/ProfileEditAvatarDialogue';
import ErrorDialogue from './dialogue/ErrorDialogue';
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

    // Initialize dialogue states
    const [isCardAddDialogueOpen, setIsCardAddDialogueOpen] = React.useState(false);
    const [isCardViewDialogueOpen, setIsCardViewDialogueOpen] = React.useState(false);
    const [isCardRemoveDialogueOpen, setIsCardRemoveDialogueOpen] = React.useState(false);
    const [isProfileEditInfoDialogueOpen, setIsProfileEditInfoDialogueOpen] = React.useState(false);
    const [isProfileEditAvatarDialogueOpen, setIsProfileEditAvatarDialogueOpen] = React.useState(false);
    const [isErrorDialogueOpen, setIsErrorDialogueOpen] = React.useState(false);

    // Initialize dialogue-related states
    const [selectedCard, setSelectedCard] = React.useState({});
    const [errorMessage, setErrorMessage] = React.useState(undefined);

    // Handle an error response from the server
    const handleErrorResponse = (error) => {
        setErrorMessage(error);
        setIsErrorDialogueOpen(true);
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
                onAddCardClick={() => setIsCardAddDialogueOpen(true)}
                onEditInfoClick={() => setIsProfileEditInfoDialogueOpen(true)}
                onEditAvatarClick={() => setIsProfileEditAvatarDialogueOpen(true)}
                onCardImageClick={(cardData) => {
                    setSelectedCard(cardData);
                    setIsCardViewDialogueOpen(true);
                }}
                onCardLikeClick={(cardData, isLiked) => {
                    const apiRequest = isLiked ? api.dislikeCard(cardData._id) : api.likeCard(cardData._id);
                    apiRequest
                        .then((response) => updateCard(cardData._id, response))
                        .catch(handleErrorResponse);
                }}
                onCardRemoveClick={(cardData) => {
                    setSelectedCard(cardData);
                    setIsCardRemoveDialogueOpen(true);
                }}
                isLoading={isLoading}
            />

            <Footer/>

            <CardAddDialogue
                isOpen={isCardAddDialogueOpen}
                onCloseClick={() => setIsCardAddDialogueOpen(false)}
                onFormSubmit={() => {
                    // TODO: Form submission
                    setIsCardAddDialogueOpen(false);
                }}
            />

            <CardViewDialogue
                isOpen={isCardViewDialogueOpen}
                onCloseClick={() => setIsCardViewDialogueOpen(false)}
                selectedCard={selectedCard}
            />

            <CardRemoveDialogue
                isOpen={isCardRemoveDialogueOpen}
                onCloseClick={() => setIsCardRemoveDialogueOpen(false)}
                onFormSubmit={() => {
                    api.deleteCard(selectedCard._id)
                        .then(() => {
                            removeCard(selectedCard._id);
                            setIsCardRemoveDialogueOpen(false);
                        })
                        .catch(handleErrorResponse);
                }}
            />

            <ProfileEditInfoDialogue
                isOpen={isProfileEditInfoDialogueOpen}
                onCloseClick={() => setIsProfileEditInfoDialogueOpen(false)}
                onFormSubmit={() => {
                    // TODO: Form submission
                    setIsProfileEditInfoDialogueOpen(false);
                }}
            />

            <ProfileEditAvatarDialogue
                isOpen={isProfileEditAvatarDialogueOpen}
                onCloseClick={() => setIsProfileEditAvatarDialogueOpen(false)}
                onFormSubmit={() => {
                    // TODO: Form submission
                    setIsProfileEditAvatarDialogueOpen(false);
                }}
            />

            <ErrorDialogue
                isOpen={isErrorDialogueOpen}
                onCloseClick={() => setIsErrorDialogueOpen(false)}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default App;
