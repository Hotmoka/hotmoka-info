<template>
  <div v-if="nodeInfo">

    <b-card
        class="shadow-sm"
        header-bg-variant="primary"
        header-tag="header">

      <template #header>
        <h4>Welcome to {{ networkName }} network</h4>
        <p class="lead" style="margin-bottom: 0">Below you will find information about the node</p>
      </template>

    <ul id="info-tree">
      <li v-if="nodeInfo.takamakaCode">
        takamakaCode: <code class="storage-ref-code">{{ nodeInfo.takamakaCode.hash }}</code>
      </li>
      <li v-if="nodeInfo.manifest">
        manifest: <code class="storage-ref-code">{{ referenceToString(nodeInfo.manifest.transaction.hash, nodeInfo.manifest.progressive) }}</code>

        <!-- manifest -->
        <ul>
          <li>
            chainId: <code>{{ nodeInfo.chainId }}</code>
          </li>
          <li>
            maxErrorLength: <code>{{ nodeInfo.maxErrorLength }}</code>
          </li>
          <li>
            maxDependencies: <code>{{ nodeInfo.maxDependencies }}</code>
          </li>
          <li>
            maxCumulativeSizeOfDependencies: <code>{{ nodeInfo.maxCumulativeSizeOfDependencies }}</code>
          </li>
          <li>
            allowsSelfCharged: <code>{{ nodeInfo.allowsSelfCharged }}</code>
          </li>
          <li>
            allowsUnsignedFaucet: <code>{{ nodeInfo.allowsUnsignedFaucet }}</code>
          </li>
          <li>
            allowsMintBurnFromGamete: <code>{{ nodeInfo.allowsMintBurnFromGamete }}</code>
          </li>
          <li>
            skipsVerification: <code>{{ nodeInfo.skipsVerification }}</code>
          </li>
          <li>
            signature: <code>{{ nodeInfo.signature }}</code>
          </li>

          <!-- gamete -->
          <li class="filled-dot" v-if="nodeInfo.gameteInfo">
            gamete: <code class="storage-ref-code">{{ referenceToString(nodeInfo.gameteInfo.gamete.transaction.hash, nodeInfo.gameteInfo.gamete.progressive) }}</code>

            <ul>
              <li>
                balance: <code>{{ nodeInfo.gameteInfo.balanceOfGamete }}</code>
              </li>
              <li>
                redBalance: <code>{{ nodeInfo.gameteInfo.redBalance }}</code>
              </li>
              <li>
                maxFaucet: <code>{{ nodeInfo.gameteInfo.maxFaucet }}</code>
              </li>
              <li>
                maxRedFaucet: <code>{{ nodeInfo.gameteInfo.maxRedFaucet}}</code>
              </li>
            </ul>
          </li>


          <!-- gas station -->
          <li class="filled-dot" v-if="nodeInfo.gasStation">
            gasStation: <code class="storage-ref-code">{{ referenceToString(nodeInfo.gasStation.gasStation.transaction.hash, nodeInfo.gasStation.gasStation.progressive) }}</code>

            <ul>
              <li>
                initialGasPrice: <code>{{ nodeInfo.gasStation.initialGasPrice }}</code>
              </li>
              <li>
                gasPrice: <code>{{ nodeInfo.gasStation.gasPrice }}</code>
              </li>
              <li>
                maxGasPerTransaction: <code>{{ nodeInfo.gasStation.maxGasPerTransaction }}</code>
              </li>
              <li>
                ignoresGasPrice: <code>{{ nodeInfo.gasStation.ignoresGasPrice }}</code>
              </li>
              <li>
                targetGasAtReward: <code>{{ nodeInfo.gasStation.targetGasAtReward}}</code>
              </li>
              <li>
                oblivion: <code>{{ nodeInfo.gasStation.oblivion }} (ie. {{ nodeInfo.gasStation.oblivionInfo }})</code>
              </li>
            </ul>
          </li>

          <!-- validators -->
          <li class="filled-dot" v-if="nodeInfo.validators">
            validators: <code class="storage-ref-code">{{
              referenceToString(nodeInfo.validators.validatorsReference.transaction.hash, nodeInfo.validators.validatorsReference.progressive) }}
          </code>

            <ul>
              <li>
                surcharge for buying validation power: <code>{{ nodeInfo.validators.buyerSurcharge }} (ie. {{ nodeInfo.validators.buyerSurchargeInfo}})</code>
              </li>
              <li>
                slashing for misbehaving validators: <code>{{ nodeInfo.validators.slashingForMisbehaving }} (ie. {{ nodeInfo.validators.slashingForMisbehavingInfo}})</code>
              </li>
              <li>
                slashing for not behaving validators: <code>{{ nodeInfo.validators.slashingForNotBehaving }} (ie. {{ nodeInfo.validators.slashingForNotBehavingInfo}})</code>
              </li>
              <li>
                percent of validators' reward that gets staked: <code>{{ nodeInfo.validators.percentStaked }} (ie. {{ nodeInfo.validators.percentStakedInfo}})</code>
              </li>
              <li>
                number of validators: <code>{{ nodeInfo.validators.numOfValidators }}</code>
              </li>
              <li class="filled-dot" v-for="(v, index) in nodeInfo.validators.validators" :key="index">
                validator #{{index}}: <code class="storage-ref-code"> {{ referenceToString(v.validator.transaction.hash, v.validator.progressive) }}</code>

                <ul>
                  <li>
                    id: <code>{{ v.id }}</code>
                  </li>
                  <li>
                    balance: <code>{{ v.balanceOfValidator }}</code>
                  </li>
                  <li>
                    power: <code>{{ v.power }}</code>
                  </li>
                </ul>
              </li>
              <li>
                initialSupply: <code>{{ nodeInfo.validators.initialSupply }}</code>
              </li>
              <li>
                currentSupply: <code>{{ nodeInfo.validators.currentSupply }}</code>
              </li>
              <li>
                finalSupply: <code>{{ nodeInfo.validators.finalSupply }}</code>
              </li>
              <li>
                initialRedSupply: <code>{{ nodeInfo.validators.initialRedSupply }}</code>
              </li>
              <li>
                initialInflation: <code>{{ nodeInfo.validators.initialInflation}} (ie. {{ nodeInfo.validators.initialInflationInfo}})</code>
              </li>
              <li>
                currentInflation: <code>{{ nodeInfo.validators.currentInflation}} (ie. {{ nodeInfo.validators.currentInflationInfo}})</code>
              </li>
              <li>
                height: <code>{{ nodeInfo.validators.height}}</code>
              </li>
              <li>
                numberOfTransactions: <code>{{ nodeInfo.validators.numberOfTransactions}}</code>
              </li>
              <li>
                ticketForNewPoll: <code>{{ nodeInfo.validators.ticketForNewPoll}}</code>
              </li>
              <li>
                number of polls: <code>{{ nodeInfo.validators.numberOfPolls}}</code>
              </li>
            </ul>
          </li>

          <!-- initial validators -->
          <li class="filled-dot" v-if="nodeInfo.initialValidators">
            initial validators: <code class="storage-ref-code">{{
              referenceToString(nodeInfo.initialValidators.validatorsReference.transaction.hash, nodeInfo.initialValidators.validatorsReference.progressive) }}
          </code>

            <ul>
              <li>
                number of initial validators: <code>{{ nodeInfo.initialValidators.numberOfInitialValidators }}</code>
              </li>

              <li class="filled-dot" v-for="(v, index) in nodeInfo.initialValidators.validators" :key="index">
                initial validator #{{index}}: <code class="storage-ref-code"> {{ referenceToString(v.validator.transaction.hash, v.validator.progressive) }}</code>

                <ul>
                  <li>
                    id: <code>{{ v.id }}</code>
                  </li>
                  <li>
                    balance: <code>{{ v.balanceOfValidator }}</code>
                  </li>
                  <li>
                    power: <code>{{ v.power }}</code>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <!-- accountsLedger -->
          <li class="filled-dot" v-if="nodeInfo.accountsLedger">
            accountsLedger: <code class="storage-ref-code">{{ referenceToString(nodeInfo.accountsLedger.transaction.hash, nodeInfo.accountsLedger.progressive) }}</code>
          </li>

          <!-- versions -->
          <li class="filled-dot" v-if="nodeInfo.versions">
            versions: <code class="storage-ref-code">{{ referenceToString(nodeInfo.versions.transaction.hash, nodeInfo.versions.progressive) }}</code>

            <ul>
              <li>
                verificationVersion: <code>{{ nodeInfo.verificationVersion}}</code>
              </li>
            </ul>
          </li>

        </ul>

      </li>
    </ul>

    </b-card>

  </div>
</template>

<script>
export default {
  name: "NodeInfo",
  props: {
    nodeInfo: Object,
    networkName: String
  },
  methods: {
    referenceToString(hash, progressive) {
      return hash + '#' + parseInt(progressive).toString(16)
    }
  }
}
</script>

<style scoped>
#info-tree {
  margin: 0;
  padding: 0 15px 0 15px;
  text-align: left;
}

#info-tree ul {
  list-style-type: circle;
}

.filled-dot {
  list-style-type: disc;
}
code {
  font-size: 15px;
}
.storage-ref-code {
  color: #0031ca;
}

.card-header {
  color: #fff !important;
  font-weight: bolder;
}

.card {
  margin-top: 1.5rem;
}

@media (max-width: 577px) {
  .card {
    margin-top: 2.5rem;
  }
}
</style>