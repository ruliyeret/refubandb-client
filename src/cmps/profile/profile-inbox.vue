<template>
  <section class="inbox-container">
    <div class="messages-list">
      <div class="messages-list-header">
        <span class="material-icons-outlined">
          menu
        </span>
        <h3>All messages</h3>
      </div>
      <input type="text" placeholder="Search messages" />
      <ul>
        <li>
          <div class="img"></div>
          <div>
            <h5>fewfewr</h5>
            <p>fefgregerfgref</p>
            <p>vbklmcbnkxfgm</p>
          </div>
        </li>
        <li>
          <div class="img"></div>
          <div>
            <h5>fewfewr</h5>
            <p>fefgregerfgref</p>
            <p>vbklmcbnkxfgm</p>
          </div>
        </li>
        <li>
          <div class="img"></div>
          <div>
            <h5>fewfewr</h5>
            <p>fefgregerfgref</p>
            <p>vbklmcbnkxfgm</p>
          </div>
        </li>
        <li>
          <div class="img"></div>
          <div>
            <h5>fewfewr</h5>
            <p>fefgregerfgref</p>
            <p>vbklmcbnkxfgm</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="conversation-container">
      <h3>user {{ fullname }}</h3>
      <ul>
        <li>
          <div class="img"></div>
          <div>
            <h5>name</h5>
            <p>fefgregerffwerfggref</p>
          </div>
        </li>
        <li>
          <div class="img"></div>
          <div>
            <h5>name</h5>
            <p>fefgrefewfgerfgref</p>
          </div>
        </li>
        <li>
          <div class="img"></div>
          <div>
            <h5>name</h5>
            <p>fefgrfewegerfgref</p>
          </div>
        </li>
        <li>
          <div class="img"></div>
          <div>
            <h5>name</h5>
            <p>fefgregergvrefgrefvfgref</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="messages-stay-details">
      <div class="messages-stay-details-header">
        <h3>Reservation details</h3>
        <span class="material-icons-outlined">
          close
        </span>
      </div>
      <div class="info">
        <div class="host-info">
          <h5>name</h5>
          <p>2 guests &middot; 4 nights &middot; $213</p>
          <p>country city</p>
        </div>
        <div class="img"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      fullname: 'fullname',
    };
  },
  computed: {},
  methods: {},
  created() {},
};
</script>
