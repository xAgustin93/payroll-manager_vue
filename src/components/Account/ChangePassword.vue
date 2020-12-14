<template>
  <form class="ui form change-password" @submit.prevent="onChangeEmail">
    <div class="three fields">
      <div class="field">
        <input
          type="password"
          placeholder="Contraseña actual"
          v-model="formData.password"
          :class="{ error: formError.password }"
        />
      </div>
      <div class="field">
        <input
          type="password"
          placeholder="Nueva contraseña"
          v-model="formData.newPassword"
          :class="{ error: formError.newPassword }"
        />
      </div>
      <div class="field">
        <input
          type="password"
          placeholder="Repite la nueva contraseña"
          v-model="formData.newPasswordRepeat"
          :class="{ error: formError.newPasswordRepeat }"
        />
      </div>
    </div>
    <p v-if="messageError">{{ messageError }}</p>
    <button type="submit" class="ui button primary" :class="{ loading }">
      Actualizar
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
import { auth } from "../../utils/firebase";
import { reauthenticate } from "../../utils/firebaseFunctions";

export default {
  name: "ChangePassword",
  setup() {
    let formData = {};
    let formError = ref({});
    let loading = ref(false);
    let messageError = ref("");

    const schemaForm = Yup.object().shape({
      password: Yup.string().required(true),
      newPassword: Yup.string().required(),
      newPasswordRepeat: Yup.string()
        .required(true)
        .oneOf([Yup.ref("newPassword")], true),
    });

    const onChangeEmail = async () => {
      formError.value = {};
      messageError.value = "";
      loading.value = true;

      try {
        await schemaForm.validate(formData, { abortEarly: false });
        try {
          const { password, newPassword } = formData;
          await reauthenticate(password);
          await auth.currentUser.updatePassword(newPassword);
          auth.signOut();
        } catch (error) {
          console.log(error);
          messageError.value = error.message;
        }
      } catch (err) {
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }

      loading.value = false;
    };

    return {
      formData,
      onChangeEmail,
      formError,
      loading,
      messageError,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.form.change-password {
  text-align: center;

  input.error {
    border-color: #faa;
    background-color: #ffeded;
  }

  .ui.button {
    margin: 20px 0 0 0;
  }
}
</style>