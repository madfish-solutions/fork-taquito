<script lang="ts">
  import { onMount } from "svelte";
  import { TezosToolkit } from "@taquito/taquito";
  import { NetworkType } from "@airgap/beacon-sdk";
  import Select from "svelte-select";
  import { rpcUrl } from "./config";
  import store from "./store";
  import Layout from "./Layout.svelte";
  import TestContainer from "./lib/TestContainer.svelte";

  // https://ide.ligolang.org/p/RL93C86hftTTCNGU0ykLMw | https://ide.ligolang.org/p/61ENTorA4PSfQg-jhpu0jA
  // https://better-call.dev/florencenet/KT1PzUGbdKaN332Smfd1ExpdKQ7BSzzJRqJ4/operations
  // https://better-call.dev/granadanet/KT1T836HqhBu9waqmknStVDCXu2WogZtzsNz/operations
  // https://better-call.dev/hangzhounet/KT1T2gL26SwYMxpkR5SZT1pHRBF84knfw8Cg/operations
  // https://better-call.dev/ithacanet/KT1QKmcNBcfzVTXG2kBcE6XqXtEuYYUzMcT5/operations
  // https://better-call.dev/kathmandunet/KT1BQuSVXWz23iGeXQCrAGR6GcVcqKeE1F7T/operations

  let browser = "";
  let availableNetworks = [
    { value: "ghostnet", label: "Ghostnet", group: "current testnets" },
    { value: "kathmandunet", label: "Kathmandunet", group: "current testnets" },
    { value: "mainnet", label: "Mainnet", group: "mainnet" },
    { value: "dailynet", label: "Dailynet", group: "other testnets" },
    { value: "jakartanet", label: "Jakartanet", group: "other testnets" },
    { value: "mondaynet", label: "Mondaynet", group: "other testnets" },
    { value: "custom", label: "Custom", group: "custom network" },
  ];
  let availableMatrixNodes = [
    { value: "default", label: "Default" },
    { value: "taquito", label: "Taquito" },
    { value: "custom", label: "Custom" },
  ];
  let networkError = false;
  let showCustomNetworkInput = false;
  let customNetworkInput = "https://";
  const groupBy = (item) => item.group;

  const changeNetwork = (event) => {
    networkError = false;
    showCustomNetworkInput = false;
    switch (event.detail.value.toLocaleLowerCase()) {
      case "mainnet":
        store.updateTezos(new TezosToolkit(rpcUrl.mainnet));
        store.updateNetworkType(NetworkType.MAINNET);
        break;
      case "hangzhounet":
        store.updateTezos(new TezosToolkit(rpcUrl.hangzhounet));
        store.updateNetworkType(NetworkType.HANGZHOUNET);
        break;
      case "ithacanet":
        store.updateTezos(new TezosToolkit(rpcUrl.ithacanet));
        store.updateNetworkType(NetworkType.ITHACANET);
        break;
      case "ghostnet":
        store.updateTezos(new TezosToolkit(rpcUrl.ghostnet));
        store.updateNetworkType(NetworkType.GHOSTNET);
        break;
      case "kathmandunet":
        store.updateTezos(new TezosToolkit(rpcUrl.kathmandunet));
        store.updateNetworkType(NetworkType.KATHMANDUNET);
        break;
      case "custom":
        //TODO: input custom RPC URL
        showCustomNetworkInput = true;
        setTimeout(() => {
          document.getElementById("custom-network-input").focus();
        }, 100);
        break;
      default:
        console.error("Unhandled network:", event.detail.value);
        networkError = true;
    }
  };

  const changeMatrixNode = (event) => {
    switch (event.detail.value.toLocaleLowerCase()) {
      case "default":
        store.updateMatrixNode("beacon-node-1.sky.papers.tech");
        break;
      case "taquito":
        store.updateMatrixNode("matrix.tez.ie");
        break;
      case "custom":
        store.updateMatrixNode("beacon-node-1.sky.papers.tech");
        if (!rpcUrl.custom) {
          // in case the user did not provide any custom network URL
          store.updateTezos(new TezosToolkit(rpcUrl.ghostnet));
        }
        break;
    }
  };

  onMount(() => {
    // cleans up the local storage
    if (window && window.localStorage) {
      // finds the Beacon keys
      const beaconKeys = Object.keys(window.localStorage).filter((key) =>
        key.toLowerCase().includes("beacon")
      );
      // deletes the keys
      beaconKeys.forEach((key) => delete window.localStorage[key]);
    }
    // detects the browser
    let userAgent = navigator.userAgent;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browser = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browser = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browser = "safari";
    } else if (userAgent.match(/opr\//i)) {
      browser = "opera";
    } else if (userAgent.match(/edg/i)) {
      browser = "edge";
    } else {
      browser = "";
    }
  });
</script>

<style lang="scss">
  .connect-container {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;

    .connect-options {
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: white;
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .options {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        align-items: center;
        width: 60%;

        & > * {
          margin: 10px 0px;
        }

        button {
          width: 100%;
          justify-content: center;
        }
      }

      label {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
      }

      input[type="text"] {
        width: 100%;
      }

      @supports not (backdrop-filter: blur(4px)) {
        background: rgba(4, 189, 228, 0.8);
      }
    }
  }

  .custom-select {
    --border: 2px solid white;
    --borderRadius: 0.4rem;
    --background: transparent;
    --inputColor: white;
    --itemColor: rgba(2, 83, 185, 1);
    --itemHoverColor: rgba(2, 83, 185, 1);
    --errorBorder: 2px solid red;
    --errorBackground: transparent;
  }
</style>

<Layout>
  {#if $store.userAddress && $store.wallet}
    <TestContainer />
  {:else}
    <div class="connect-container">
      <div class="connect-options">
        <h1>Welcome to the Taquito test dapp</h1>
        {#if browser !== "chrome" && browser !== "firefox"}
          <div>(use Chrome for a better experience)</div>
        {/if}
        <div class="options">
          <button
            on:click={() => {
              const wallet = document.getElementById("wallet-button");
              wallet.click();
            }}
          >
            <span class="material-icons-outlined"> account_balance_wallet </span>
            &nbsp; Connect your wallet
          </button>
          <button>
            <span class="material-icons-outlined"> usb </span>
            &nbsp; Connect your Nano ledger
          </button>
          <label for="rpc-node-select" class="custom-select">
            <span class="select-title">RPC node:</span>
            <Select
              id="rpc-node-select"
              containerStyles="width:200px"
              items={availableNetworks}
              value={$store.networkType
                .split("")
                .map((char, i) => (i === 0 ? char.toUpperCase() : char))
                .join("")}
              hasError={networkError}
              {groupBy}
              on:select={changeNetwork}
            />
          </label>
          {#if showCustomNetworkInput}
            <input
              id="custom-network-input"
              type="text"
              bind:value={customNetworkInput}
              placeholder="Custom network URL"
              on:keyup={(e) => {
                if (e.key === "Enter") {
                  store.updateNetworkType(NetworkType.CUSTOM, customNetworkInput);
                }
              }}
            />
          {/if}
          <label for="matrix-node-select" class="custom-select">
            <span class="select-title">Matrix node:</span>
            <Select
              id="matrix-node-select"
              containerStyles="width:200px"
              items={availableMatrixNodes}
              value={$store.matrixNode}
              on:select={changeMatrixNode}
            />
          </label>
          <label>
            <span class="select-title">Disable default events:</span>
            <input
              type="checkbox"
              checked={$store.disableDefaultEvents}
              on:change={() => store.updateDefaultEvents()}
            />
          </label>
        </div>
      </div>
    </div>
  {/if}
</Layout>
