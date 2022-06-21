<template>
  <div>
    <h1>VueVis.js</h1>
    <p>
      A Vuejs 2 adapter for Visjs

    </p>
    <DataInfo></DataInfo>
    <network
        id="visNetwork"
        class="network"
        ref="network"
        :nodes="network.nodes"
        :edges="network.edges"
        :options="network.options"
        @click="networkEvent('click')"
        @double-click="networkEvent('doubleClick')"
        @hold="networkEvent('hold')"
        @select="networkEvent('select')"
        @select-node="networkEvent('selectNode')"
        @select-edge="networkEvent('selectEdge')"
    >
    </network>
    <div class="downloadBtn">
      <button type="button" @click="downloadImage">Download</button>
    </div>

    <div class="events">
      <p>
        Network events: <br />
        {{ networkEvents }}
      </p>
    </div>

  </div>
</template>

<script>
import DataInfo from "@/components/DataInfo";
import { Network } from "@vue2vis/network";
import "vis-network/styles/vis-network.css";
import {downloadHtmlToImg} from "@/lib/common/html2canvas";
import node from "@/jsonData/node.json"
import link from "@/jsonData/link.json"
const nodeJson = node;
const linkJson = link;

const nodesParsed = Object.keys(nodeJson).map(key => {
  return {
    id: key,
    label: key,
    value: nodeJson[key]
  }
})
console.log('nodesParsed', nodesParsed)

const linkParsed = linkJson.map(link => {
  return {
    length: (link[0] * 100),
    from: link[1].split(',')[0],
    to: link[1].split(',')[1]
  }
})
console.log('linkParsed', linkParsed)


export default {
  name: "VueVis",

  components: {
    DataInfo,
    Network
  },

  data: () => ({
    networkEvents: "",

    network: {
      nodes: nodesParsed,
      edges: linkParsed,

      options: {
        physics: {

          barnesHut: {
            gravitationalConstant: -1000000,
            springConstant: 0.001,
            springLength: 200
          }
        },
        interaction: {
          tooltipDelay: 200,
          hideEdgesOnDrag: true
        },


        nodes: {

          shape: "circle",
          scaling: {
            label: {
              enabled: true,
              min: 20,
              max: 500
            }
          },
          // scaling: {
          //   min: 10,
          //   max: 500,
          //   label: {
          //     enabled: false,
          //     min: 14,
          //     max: 50,
          //     maxVisible: 30,
          //     drawThreshold: 5
          //   },
          //   // customScalingFunction: function (min,max,total,value) {
          //   //   if (max === min) {
          //   //     return 0.5;
          //   //   }
          //   //   else {
          //   //     let scale = 1 / (max - min);
          //   //     return Math.max(0,(value - min)*scale);
          //   //   }
          //   // }
          // },

        },

      }
    }



  }),

  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
    },
    addNode() {
      const id = new Date().getTime();
      this.nodes.push({ id, label: "New node" });
    },
    addEdge() {
      const n1 = Math.floor(Math.random() * this.nodes.length);
      const n2 = Math.floor(Math.random() * this.nodes.length);
      this.edges.push({
        id: `${this.nodes[n1].id}-${this.nodes[n2].id}`,
        from: this.nodes[n1].id,
        to: this.nodes[n2].id
      });
    },
    async downloadImage() {
      let elementById =document.querySelector('#visNetwork > div > canvas')
      await downloadHtmlToImg(elementById,'chart')

    }
  },


  }

</script>

<style scoped>
.wrapper {
  padding: 20px 50px;
  text-align: center;
}
.events {
  text-align: left;
  height: 70px;
}
.network {
  height: 80vh;
  width: 80vw;
  border: 1px solid #ccc;
  margin: 5px 0;
}
.downloadBtn {
  border: 1px solid blue;
}
</style>