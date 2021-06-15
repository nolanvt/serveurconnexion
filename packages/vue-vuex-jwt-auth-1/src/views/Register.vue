<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="prenom">prenom</label>
            <input
              v-model="user.prenom"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="prenom"
            />
            <div
              v-if="submitted && errors.has('prenom')"
              class="alert-danger"
            >{{errors.first('prenom')}}</div>
          </div>
          <div class="form-group">
            <label for="nom">nom</label>
            <input
              v-model="user.nom"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="nom"
            />
            <div
              v-if="submitted && errors.has('nom')"
              class="alert-danger"
            >{{errors.first('nom')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
        <label for="sex">sex</label>
        <input
          class="form-control"
          id="sex"
          required
          v-model="user.sex"
          name="sex"
        />
                 <div
              v-if="submitted && errors.has('sex')"
              class="alert-danger"
            >{{errors.first('sex')}}</div>
          </div>
            <div class="form-group">
        <label for="adresse">adresse</label>
        <input
          class="form-control"
          id="adresse"
          required
          v-model="user.adresse"
          name="adresse"
        />
                 <div
              v-if="submitted && errors.has('adresse')"
              class="alert-danger"
            >{{errors.first('adresse')}}</div>
          </div>
            <div class="form-group">
        <label for="age">age</label>
        <input
          class="form-control"
          id="age"
          required
          v-model="user.age"
          name="age"
        />
                 <div
              v-if="submitted && errors.has('age')"
              class="alert-danger"
            >{{errors.first('age')}}</div>
          </div>
         <div class="form-group">
        <label for="activites">activites</label>
        <input
          class="form-control"
          id="activites"
          required
          v-model="user.activites"
          name="activites"
        />
                 <div
              v-if="submitted && errors.has('activites')"
              class="alert-danger"
            >{{errors.first('activites')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>