<template>
  <b-navbar id="h-navbar" toggleable="lg" type="dark" variant="info">
    <div class="container header">
      <img id="hotmoka-logo" alt="Hotmoka" src="../assets/big_logo_hotmoka.png" height="48">

      <b-button v-if="!connectedNode.isConnected && !connectedNode.connecting" variant="outline-primary" @click="onConnectToNodeClick">Connect to node</b-button>
      <div style="display: flex; align-items: center" v-if="connectedNode.isConnected">
        <div class="d-none d-sm-block connected-badge badge badge-success">
          <b-icon icon="globe"></b-icon> <span class="highlighted">{{ getRemoteNodeUrl }}</span>
        </div>
        <b-icon class="exit-icon" variant="danger" icon="power" @click="onDisconnectFromNodeClick"></b-icon>
      </div>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  props: {
    connectedNode: Object,
    isDev: Boolean
  },
  computed: {
    getRemoteNodeUrl() {
      return this.isDev && this.connectedNode.url === '' ? 'localhost' : this.connectedNode.url
    }
  },
  methods: {
    onConnectToNodeClick() {
      this.$emit('onConnectToNode')
    },
    onDisconnectFromNodeClick() {
      this.$emit('onDisconnectFromNode')
    }
  }
}
</script>

<style scoped>

.header {
  height: 48px
}

#h-navbar {
  background-color: #fff !important;
  box-shadow: 0 2px 5px rgba(171, 154, 154, 0.4);
}

.exit-icon {
  width: 32px; height: 32px;
  margin-left: 12px;
  cursor: pointer;
}


</style>