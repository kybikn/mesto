import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

import {
  apiConfig,
  cardParameters,
  formParameters,
  popupParameters,
  profileEditBtn,
  profileAddBtn,
  profileAvatarBtn,
  formProfile,
  formPlace,
  formAvatar,
} from '../variables.js';

async function main() {
  // ----------------Инстансы------------------
  /** Инстанс попапа профиля */
  const popupProfileInstance = new PopupWithForm(
    popupParameters.popupProfileSelector,
    handleChangeValuePopupProfile,
    formParameters
  );

  /** Инстанс попапа места */
  const popupPlaceInstance = new PopupWithForm(
    popupParameters.popupPlaceSelector,
    handleAddPlaceCard,
    formParameters
  );

  /** Инстанс попапа фото */
  const popupPhotoInstance = new PopupWithImage(
    popupParameters.popupPhotoSelector,
    popupParameters.popupImgSelector,
    popupParameters.popupImgTitleSelector
  );

  /** Инстанс попапа аватара */
  const popupAvatarInstance = new PopupWithForm(
    popupParameters.popupAvatarSelector,
    handleChangeAvatar,
    formParameters
  );

  /** Инстанс попапа подтверждения удаления */
  const popupDeleteConfirmationInstance = new PopupWithConfirmation(
    popupParameters.popupDeleteSelector,
    handleDeleteConfirmation,
    formParameters
  );

  /** Инстанс формы профиля */
  const profileFormValidator = new FormValidator(formParameters, formProfile);
  /** Добавляем валидацию для формы профиля */
  profileFormValidator.enableValidation();

  /** Инстанс формы места */
  const placeFormValidator = new FormValidator(formParameters, formPlace);
  /** Добавляем валидацию для формы места */
  placeFormValidator.enableValidation();

  /** Инстанс формы аватара пользователя */
  const avatarFormValidator = new FormValidator(formParameters, formAvatar);
  /** Добавляем валидацию для формы места */
  avatarFormValidator.enableValidation();

  // ----- Экземпляр класса Api --------
  const api = new Api(apiConfig);

  // --------   Работа с API ------------

  let userInfoInstance;
  let section;
  // объединенный запрос данных профиля и получения карточек
  Promise.all([api.getProfile(), api.getInitialCards()])
    // тут деструктурируем ответ от сервера
    .then(([profile, initialCards]) => {
      // установка данных пользователя
      userInfoInstance = new UserInfo(
        popupParameters.profileTitleSelector,
        popupParameters.profileSubtitleSelector,
        popupParameters.profileAvatarSelector,
        profile
      );
      userInfoInstance.setUserInfo({
        userName: profile.name,
        userJob: profile.about,
      });
      userInfoInstance.setUserAvatar(profile.avatar);
      userInfoInstance.setUserId(profile._id);

      // отрисовка карточек
      const enrichedInitialCards = initialCards.map((cardData) =>
        enrichCardData(cardData, userInfoInstance.id)
      );
      section = new Section(
        { items: enrichedInitialCards, renderer: renderer },
        '.gallery__list'
      );
      section.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });

  /** Функция создания карточки */
  function renderer(cardData) {
    const apiCallbacks = {
      deleteCard: api.deleteCard.bind(api),
      addLike: api.addLike.bind(api),
      deleteLike: api.deleteLike.bind(api),
    };
    const confPopupCallbacks = {
      open: popupDeleteConfirmationInstance.open.bind(
        popupDeleteConfirmationInstance
      ),
      addNext: popupDeleteConfirmationInstance.addNext.bind(
        popupDeleteConfirmationInstance
      ),
    };
    const card = new Card(
      cardData,
      cardParameters,
      handleCardClick,
      apiCallbacks,
      confPopupCallbacks
    );
    return card.generateCard();
  }

  /** Функция обогащания данных карточки информацией
   * о лайке (like=true|false)
   * и является ли пользователь владельцем карточки (isOwner=true|false) */
  function enrichCardData(responseCardData, userId) {
    if (userId === responseCardData.owner._id) {
      responseCardData.isOwner = true;
    } else responseCardData.isOwner = false;
    if (responseCardData.likes.some((owner) => owner._id === userId)) {
      responseCardData.like = true;
    } else responseCardData.like = false;
    return responseCardData;
  }

  /** Функция добавления value в попап профиля */
  function addValuePopupProfile(userInfoInstance, popupProfileInstance) {
    const { userName, userJob } = userInfoInstance.getUserInfo();
    const data = { name: userName, job: userJob };
    popupProfileInstance.setInputValues(data);
  }

  /** Функция обработки нажатия кнопки сохранения профиля */
  function handleChangeValuePopupProfile(event, inputValues) {
    event.preventDefault();
    const initialText = event.submitter.textContent;
    popupProfileInstance.renderLoading(true);
    // подготовка данных для отправки на сервер и отображения
    const userData = {
      userName: inputValues.name,
      userJob: inputValues.job,
    };
    // отправка на сервер
    api
      .editProfile(userData)
      .then(() => {
        // меняются данные профиля на странице
        userInfoInstance.setUserInfo(userData);
        // закрытие попапа
        popupProfileInstance.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => popupProfileInstance.renderLoading(false, initialText));
  }

  /** Функция обработки нажатия кнопки сохранения аватара пользователя */
  function handleChangeAvatar(event, inputValues) {
    event.preventDefault();
    // Измение надписи на кнопке на время отправки информации на сервер
    const initialText = event.submitter.textContent;
    popupAvatarInstance.renderLoading(true);
    // подготовка данных для отправки на сервер и отображения
    const link = inputValues.link;
    // отправка на сервер
    api
      .editAvatar(link)
      .then(() => {
        // меняются данные профиля на странице
        userInfoInstance.setUserAvatar(link);
        // закрытие попапа
        popupAvatarInstance.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => popupAvatarInstance.renderLoading(false, initialText));
  }

  /** Функция добавления карточки места */
  async function handleAddPlaceCard(event, inputValues) {
    event.preventDefault();
    const cardData = { name: inputValues.place, link: inputValues.url };

    // на время отправки меняем надпись на кнопке
    const initialText = event.submitter.textContent;
    popupPlaceInstance.renderLoading(true);
    try {
      // отправляем карточку на сервер, на основании ответа генерируем карточку
      const responseCardData = await api.addNewCard(cardData);
      /** добавляет в данные карточек информацию о лайке (like)
       * данным пользователем и нужно ли отображать корзину(isOwner) */
      const enrichedCardData = enrichCardData(
        responseCardData,
        userInfoInstance.id
      );
      /** создает элемент карточки */
      const card = renderer(enrichedCardData);
      /** вставляет карточку в контейнер секции */
      section.addItem(card);
      // закрываем инстанс попапа
      popupPlaceInstance.close();
    } catch (err) {
      console.log(err);
    } finally {
      popupPlaceInstance.renderLoading(false, initialText);
    }
  }

  /** Функция открытия попапа фото */
  function handleCardClick(name, link) {
    popupPhotoInstance.open(name, link);
  }

  /** Обработчик подтверждения удаления */
  function handleDeleteConfirmation(event, next) {
    event.preventDefault();
    next();
    // закрываем инстанс попапа
    popupDeleteConfirmationInstance.close();
  }

  // ----------------Слушатели------------------
  /** Слушатель и функция открытия попапа карточки места */
  profileAddBtn.addEventListener('click', () => {
    placeFormValidator.resetValidation();
    popupPlaceInstance.open();
  });

  /** Слушатель и функция открытия попапа профиля */
  profileEditBtn.addEventListener('click', () => {
    addValuePopupProfile(userInfoInstance, popupProfileInstance);
    popupProfileInstance.open();
    /** убираем ошибки при повторном открытии после стирания данных */
    profileFormValidator.checkFormValidity();
  });

  /** Слушатель и функция открытия попапа аватара */
  profileAvatarBtn.addEventListener('click', () => {
    avatarFormValidator.resetValidation();
    popupAvatarInstance.open();
  });

  /** Навешивание слушателя на закрытие попапа места */
  popupPlaceInstance.setEventListeners();

  /** Навешивание слушателя на закрытие попапа профиля */
  popupProfileInstance.setEventListeners();

  /** Навешивание слушателя на закрытие попапа фото  */
  popupPhotoInstance.setEventListeners();

  /** Навешивание слушателя на закрытие попапа аватар  */
  popupAvatarInstance.setEventListeners();

  /** Навешивание слушателя на подтверждение удаления  */
  popupDeleteConfirmationInstance.setEventListeners();
}

main();
