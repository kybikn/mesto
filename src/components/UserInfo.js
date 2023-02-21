class UserInfo {
  constructor(
    profileTitleSelector,
    profileSubtitleSelector,
    profileAvatarSelector
  ) {
    this._name = document.querySelector(profileTitleSelector);
    this._job = document.querySelector(profileSubtitleSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  /**  Метод возвращает объект с данными пользователя */
  getUserInfo() {
    const userName = this._name.textContent;
    const userJob = this._job.textContent;
    return { userName, userJob };
  }

  /**  Метод принимает новые данные пользователя и добавляет их на страницу */
  setUserInfo(data) {
    this._name.textContent = data.userName;
    this._job.textContent = data.userJob;
  }

  /**  Метод отрисовывает аватар пользователя на странице */
  setUserAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }

  /**  Метод записи полученного id в id пользователя */
  setUserId(userId) {
    this.id = userId;
  }
}

export { UserInfo };
