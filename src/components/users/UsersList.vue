<template>
  <div class="link_button">
    <button @click="confirmItem">Link to the team</button>
  </div>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  data() {
    return {
      someData: false
    };
  },
  components: {
    UserItem
  },
  inject: ['users'],
  methods: {
    confirmItem() {
      //   some code...
      this.$router.push('/teams');
    }
  },
  beforeRouteLeave(_, _2, next) {
    // leave-guard, can control if a user want to leave a page
    // console.log(to, from);
    if (this.someData) {
      next();
    } else {
      const userQuestion = confirm('You want to leave?');
      next(userQuestion);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
.link_button {
  display: flex;
  margin-top: 20px;
}

button {
  margin: 0 auto;
  color: white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #11005c;
  cursor: pointer;
}
</style>
