const express = require('express');
const axios = require('axios');
const app = express();

const ROSETTA_ADDRESS = 'localhost'
const URL = `http://${ROSETTA_ADDRESS}:8080/network/status`
const OK_STATUS = 'complete'

async function checkNodeSyncStatus() {
  try {
    const response = await axios.post(URL, {
      "network_identifier": {
        "blockchain": "Filecoin",
        "network": "mainnet"
      }
    })
    const data = response.data

    return (data && data.sync_status) ? data.sync_status.stage : ''
  } catch (error) {
    console.error(`ERROR - code: ${error.code}, message: ${error.message}, response: ${error.response}`);
  }
}

const isNodeSynced = (status) => status == OK_STATUS

app.get('/health', async function (req, res, next) {
  const nodeStatus = await checkNodeSyncStatus()
  if (isNodeSynced(nodeStatus)) {
    return res.send("ok");
  }
  return res.status(503).send(`Node syncing in process or unavailable (status: ${nodeStatus})`)
});

app.listen(9080);
