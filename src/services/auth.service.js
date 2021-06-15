import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        prenom: user.prenom,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      password: user.password,
      sex: user.sex,
      adresse: user.adresse,
      age: user.age,
      activites: user.activites,
      Prix: user.Prix,
      rolle:user.rolle,
    });
  }
}

export default new AuthService();
