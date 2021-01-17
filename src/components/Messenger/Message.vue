<template>
  <div>
    <li class="list-group-item">
      <small>
        <img
          :src="
            'http://127.0.0.1:8000/storage/avatars/' + this.message.user.avatar
          "
          width="20"
          height="20"
          class="rounded-circle"
        />
        {{ this.message.user.name }}
      </small>
      <div style=" margin-left : 40px; ">{{ this.message.content }}</div>
    </li>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style></style>
