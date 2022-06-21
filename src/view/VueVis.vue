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

      options:{
        filter: true,
        // https://github.com/almende/vis/issues/2906
        // fail
        // layout: {
        //   randomSeed: 191006,
        //   improvedLayout: false
        // },
        // physics: {
        //   adaptiveTimestep: true,
        //   barnesHut: {
        //     gravitationalConstant: -8000,
        //     springConstant: 0.04,
        //     springLength: 95
        //   },
        //   stabilization: {
        //     iterations: 987
        //   }
        // }

        // https://almende.github.io/vis/examples/network/exampleApplications/worldCupPerformance.html
        // fail
        // physics: {
        //   barnesHut: {gravitationalConstant: -80000, springConstant: 0.001, springLength: 200}
        // },

        // https://github.com/almende/vis/issues/2868
        // 성공했으나 원들이 원 모양으로 생기고 가운데가 선으로 가득 채워진 형태
        // layout: {
        //   improvedLayout: true
        // },
        // physics: {
        //   enabled: false
        // },

          // enabled: false,
        // fail
        // layout: {
        //   improvedLayout: false
        // },
        // physics: {
        //   stabilization: {
        //     iterations: 500
        //   },
        //   barnesHut: {
        //     // springConstant: 0,
        //     avoidOverlap: 1,
        //     gravitationalConstant: -1000000,
        //     springConstant: 0.001,
        //     springLength: 10
        //   }
        // },
        // https://github.com/almende/vis/issues/2868
        // 성공, 계속 움직임
        // layout: {
        //   randomSeed: 191006,    // Optional; insert your value here
        //   improvedLayout: false
        // },
        //
        // physics: {
        //   enabled: true,
        //   stabilization: {
        //     iterations: 1,      // Change this to whatever is convenient for you
        //     // onlyDynamicEdges: true,
        //   }
        // },

        //https://stackoverflow.com/questions/64951943/vis-js-how-to-spread-nodes-evanly-on-all-canvas-and-avoid-text-overlapping
        // fail
        // physics: {
        //   barnesHut: {
        //     "gravitationalConstant": -3900,
        //     "centralGravity": 0
        //   },
        //   minVelocity: 1
        // },

        // https://stackoverflow.com/questions/60080433/vis-js-network-hierarchical-layout-issue-related-to-number-of-nodes
        // 트리구조. 그려지는것 ok, 연결 길이값 정확도 불
        // layout: {
        //   randomSeed: 1,
        //   improvedLayout: false,
        //   hierarchical: {
        //     enabled: true,
        //     levelSeparation: 150,
        //     nodeSpacing: 110,
        //     treeSpacing: 200,
        //     blockShifting: false,
        //     edgeMinimization: true,
        //     parentCentralization: true,
        //     direction: "LR",
        //     sortMethod: "directed",
        //     shakeTowards: "roots"
        //   }
        // },

        // fail
        // physics:{
        //   barnesHut: {
        //     springLength: 1000,
        //     springConstant: 1,
        //     avoidOverlap: 1
        //   },
        // },





        // interaction: {
        //   tooltipDelay: 200,
        //   hideEdgesOnDrag: true
        // },
        physics: {
          stabilization: false,
          barnesHut: {
            gravitationalConstant: -80000,
            springConstant: 0.001,
            springLength: 200,
          },
        },
        interaction: {
          tooltipDelay: 200,
          hideEdgesOnDrag: true,
        },

        nodes: {
          shape:'circle',
          scaling: {
            min: 10,
            max: 50,
          },
          font: {
            size: 12,
            face: "Tahoma",
          },
        },
        edges: {
          color:{
            color: 'rgba(0, 0, 0, 0.1)',
            highlight: 'rgba(0, 0, 0, 1)'
          },
          smooth: {
            type: 'straightCross'
          }
        }
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