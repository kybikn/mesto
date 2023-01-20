class UserInfo {
  constructor(profileTitleSelector, profileSubtitleSelector) {
    this._name = document.querySelector(profileTitleSelector);
    this._job = document.querySelector(profileSubtitleSelector);
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
}

export { UserInfo };
