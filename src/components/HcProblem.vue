<template>
  <div class="hc-problem">
    <div class="box" v-if="show">
      <article class="media">
        <figure class="media-left">
          <p class="image">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ problem.title }}</strong>
              <br>
              <span>{{ problem.description }}</span>
            </p>
          </div>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <a class="button is-link">
                  <span class="icon">
                    <i class="fas fa-arrow-down"></i>
                  </span>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div class="media-right">
          <button class="delete" @click="show = false"></button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hc-problem',
  props: ['problem'],

  data() {
    return {
      show: true
    }
  },

  watch: {
    problem(newProblem, oldProblem) {
      this.show = true
    }
  }
}
</script>

<style lang="scss">
.hc-problem {
  padding-bottom: 16px;
}

article.media p.image {
  width: 64px;
}
</style>