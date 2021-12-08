<template>
  <div id="app">
    <Loader></Loader>

    <Header
        :isDev="isDev"
        :connected-node="connectedNode"
        @onConnectToNode="openConnectionModal"
        @onDisconnectFromNode="disconnectFromNode">
    </Header>

    <div class="container-fluid">

      <div class="d-sm-none connected-badge badge badge-success mobile-node-url" v-if="connectedNode.isConnected">
        <b-icon icon="globe"></b-icon> <span class="highlighted">{{ getRemoteNodeUrl }}</span>
      </div>

      <NodeInfo :nodeInfo="nodeInfo" :networkName="connectedNode.networkName"/>
      <NodeConnection :isDev="isDev" @onConnectToNode="connectToToNode" ref="nodeConnectionModal" />
    </div>

    <b-alert v-model="errorAlert.show" variant="danger" dismissible class="position-fixed error-alert ">
      {{errorAlert.message}}
    </b-alert>
  </div>
</template>

<script>


import Loader from "@/components/Loader"
import Header from "@/components/Header";
import NodeInfo from "@/components/NodeInfo";
import NodeConnection from "@/components/NodeConnection";
import {
  dismissErrorAlert,
  EventBus, getNetworkName,
  showErrorAlert,
  showSuccessToast, WrapPromiseTask
} from "@/internal/utils";
import {RemoteNode} from "hotweb3";


export default {
  name: 'App',
  components: {
    Loader,
    Header,
    NodeInfo,
    NodeConnection
  },
  data() {
   return {
     connectedNode: {
       connecting: false,
       isConnected: false,
       url: null,
       networkName: null
     },
     nodeInfo: null,
     errorAlert: {
       message: '',
       show: false
     },
     isDev: false
   }
  },
  computed: {
    getRemoteNodeUrl() {
      return this.isDev && this.connectedNode.url === '' ? 'localhost' : this.connectedNode.url
    }
  },
  methods: {
    /**
     * Retrieves the information of the remote node.
     * @param url the url of the remote node
     */
    getRemoteNodeInfo(url) {
      WrapPromiseTask(async () => new RemoteNode(url).info())
        .then(result => {
          this.connectedNode.connecting = false
          this.connectedNode.isConnected = true
          this.nodeInfo = result
        })
        .catch(() => {
          this.connectedNode.connecting = false
          showErrorAlert('Cannot fetch Hotmoka node information')
        })
    },
    openConnectionModal() {
      this.$refs.nodeConnectionModal.showModal()
    },
    /**
     * It disconnects from the remote node.
     */
    disconnectFromNode() {
      localStorage.removeItem('node-url')
      this.connectedNode = {
        url: null,
        networkName: null,
        isConnected: false,
        connecting: false
      }
      this.nodeInfo = null

      dismissErrorAlert()
      showSuccessToast(this, 'Remote node', 'Disconnected successfully from the remote node')
    },
    /**
     * Connects to a remote node and retrieves the info of the node.
     * @param url the url
     */
    connectToToNode(url) {
      localStorage.setItem('node-url', url)
      this.connectedNode.connecting = true
      this.connectedNode.url = url
      this.connectedNode.networkName = getNetworkName(url)
      this.getRemoteNodeInfo(url)
    }
  },
  created() {
    EventBus.$on('onErrorAlert', errorAlert => this.errorAlert = errorAlert)
  },
  mounted() {
    if (location.host.indexOf("localhost") !== -1) {
      this.isDev = true
    }

    // connect to remote node
    const nodeUrl = localStorage.getItem('node-url')
    if (nodeUrl !== null) {
      this.connectToToNode(nodeUrl)
    } else {
      // by default we connect to panarea.hotmoka.io
      this.connectToToNode('http://panarea.hotmoka.io')
    }
  }
}
</script>

<style lang="scss">
$theme-colors: (
    "primary": #00BEBA
);
@import "~bootstrap/scss/bootstrap.scss";
@import '~bootstrap-vue/dist/bootstrap-vue.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f4f4;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  padding-bottom: 1.5rem;
}

code, a {
  word-break: break-word !important;
}

.mobile-node-url {
  width: 100%;
  margin-bottom: -3rem;
}

.highlighted {
  font-weight: bold
}

.error-alert {
  bottom: 0;
  width: 100%;
  margin-bottom: 0!important;
}

.connected-badge {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}
</style>
