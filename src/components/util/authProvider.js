import {AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT} from 'react-admin';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const formData = new FormData();

    formData.append("email", params.username);
    formData.append("password", params.password);

    const fetchData = {
      method: 'POST',
      credentials: 'include',
      body: formData
    };

    fetch('/login-user', fetchData)
    .then(response => response.json())
    .then(loginResponse => {
      if (loginResponse.next) {
        window.location.href = loginResponse.next;
      }
    })
  }

  if (type === AUTH_LOGOUT) {
    fetch('/logout');
    localStorage.removeItem('permissions');
    window.location = '/iniciar-sesion';
    return Promise.resolve();
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('permissions');
    return Promise.resolve(role);
  }

  return Promise.resolve();
}
