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
/** Добавляем валидацию для формы аватара */
avatarFormValidator.enableValidation();

// ----- Инстанс класса Api --------
const api = new Api(apiConfig);

// --------   Работа с API ------------

let userInfoInstance;
let section;
// объединенный запрос данных профиля и получения карточек
Promise.all([api.getProfile(), api.getInitialCards()])
  // тут деструктурируем ответ от сервера (api.getProfile() => profile, api.getInitialCards() => initialCards)
  .then(([profile, initialCards]) => {
    // создание инстанса пользователя
    userInfoInstance = new UserInfo(
      popupParameters.profileTitleSelector,
      popupParameters.profileSubtitleSelector,
      popupParameters.profileAvatarSelector
    );
    // отрисовка полученных данных профиля на странице
    userInfoInstance.setUserInfo({
      userName: profile.name,
      userJob: profile.about,
    });
    // отрисовывает аватар пользователя на странице
    userInfoInstance.setUserAvatar(profile.avatar);
    // сохраняет полученный id пользователя
    userInfoInstance.setUserId(profile._id);

    // отрисовка карточек

    // проходим по массиву пришедщих карточек и обогащаем их
    // (initialCards-все полученные карточки,cardData-данные одной карточки)
    const enrichedInitialCards = initialCards.map((cardData) =>
      enrichCardData(cardData, userInfoInstance.id)
    );

    // инстанс класса Section
    section = new Section(
      { items: enrichedInitialCards, renderer: renderer },
      '.gallery__list'
    );
    // рендеринг карточек
    section.renderItems(enrichedInitialCards);
  })
  .catch((err) => {
    console.log(err);
  });

/** Функция создания одной карточки */
function renderer(cardData) {
  // обьект с колбэками для вызовов методов api для Card
  const apiCallbacks = {
    deleteCard: api.deleteCard.bind(api),
    addLike: api.addLike.bind(api),
    deleteLike: api.deleteLike.bind(api),
  };
  // обьект с колбэками для вызовов методов попапов
  const confPopupCallbacks = {
    open: popupDeleteConfirmationInstance.open.bind(
      popupDeleteConfirmationInstance
    ),
    addNext: popupDeleteConfirmationInstance.addNext.bind(
      popupDeleteConfirmationInstance
    ),
  };

  // инстанс класса Card
  const card = new Card(
    cardData,
    cardParameters,
    handleCardClick,
    apiCallbacks,
    confPopupCallbacks
  );
  // возвращаем сгенерированную карточку
  return card.generateCard();
}

/** Функция обогащания данных карточки информацией
 * о лайке (like=true|false)
 * и является ли пользователь владельцем карточки (isOwner=true|false) */
function enrichCardData(cardData, userId) {
  // делаем глубокую копию объекта карточки, чтобы не менять изначальный объект
  const enrichedCardData = JSON.parse(JSON.stringify(cardData));
  // обогащение свойством isOwner
  // если id пользователя совпадает с id владельца  карточки, то пользователь является владельцем этой карточки
  if (userId === enrichedCardData.owner._id) {
    enrichedCardData.isOwner = true;
    // если не совпадает, то не является владельцем
  } else enrichedCardData.isOwner = false;
  // обогащение свойством like
  // проходим по массиву всех лайков одной карточки и если id пользователя совпадает с id хоть одного пользователя поставившего лайк,
  if (enrichedCardData.likes.some((liker) => liker._id === userId)) {
    // то пользователь поставил лайк
    enrichedCardData.like = true;
    // если нет, то не поставил
  } else enrichedCardData.like = false;
  // возвращаем обогащенную карточку
  return enrichedCardData;
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
  // event.submitter-кнопка формы,на которой произошел сабмит. Получаем изначальный текст кнопки
  const initialText = event.submitter.textContent;
  //  изменяем текст кнопки отправки формы
  popupProfileInstance.renderLoading(true, initialText);
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
  popupAvatarInstance.renderLoading(true, initialText);
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
function handleAddPlaceCard(event, inputValues) {
  event.preventDefault();
  const cardData = { name: inputValues.place, link: inputValues.url };

  // на время отправки меняем надпись на кнопке
  const initialText = event.submitter.textContent;
  popupPlaceInstance.renderLoading(true, initialText);

  // отправляем карточку на сервер, на основании ответа генерируем карточку
  api
    .addNewCard(cardData)
    .then((responseCardData) => {
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
    })
    .catch((err) => console.log(err))
    .finally(() => popupPlaceInstance.renderLoading(false, initialText));
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
