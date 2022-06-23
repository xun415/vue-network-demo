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
        @select-node="onSelectNode"
        @deselect-node="onDeselectNode"
        @after-drawing="onFinishDrawing"
    >
    </network>
    <div class="downloadBtn">
      <button type="button" @click="downloadImage">Download</button>
    </div>
    <button @click="removeNode">Remove Node</button>

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
import node from "@/jsonData/node2.json"
import link from "@/jsonData/link2.json"
const nodeJson = node;
const linkJson = link;

const nodesParsed = Object.keys(nodeJson).map(key => {
  return {
    id: key,
    title: `${key} : ${nodeJson[key]}`,
    label: key,
    value: nodeJson[key],
    font: {
      color: 'black'
    }
  }
})
console.log('nodesParsed', nodesParsed)

const linkParsed = linkJson.map(link => {
  return {

    // length: (link[0]),
    length: link[0] * 10000,
    from: link[1].split(',')[0],
    to: link[1].split(',')[1],
    title: `from: ${link[1].split(',')[0]}, to: ${link[1].split(',')[1]}`,
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
      isLoaded: false, // 그래프 초기로딩 완료 여부

      options:{
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
        // },

        // physics: {
        //   barnesHut: {
        //     "gravitationalConstant": -3900,
        //     "centralGravity": 0
        //   },
        //   minVelocity: 1
        // },

        // https://almende.github.io/vis/examples/network/exampleApplications/worldCupPerformance.html
        // fail
        // physics: {
        //   barnesHut: {gravitationalConstant: -80000, springConstant: 0.001, springLength: 200}
        // },

        // https://github.com/almende/vis/issues/2868
        // 성공했으나 원들이 원 모양으로 생기고 가운데가 선으로 가득 채워진 형태
        // layout: {
        // //   randomSeed: 191006,
        //   improvedLayout: false
        // },
        // physics: {
        //   barnesHut: { gravitationalConstant: -30000 },
        //   stabilization: { iterations: 2500 },
        // },

          // enabled: false,
        // fail
        // layout: {
        //   improvedLayout: false
        // },
        // physics: {
        //   // enabled: false,
        //   barnesHut: {
        //     avoidOverlap: 0,
        //     springLength:100,
        //     springConstant: 0.04
        //   },
        //   stabilization: {
        //     iterations: 1,      // Change this to whatever is convenient for you
        //     onlyDynamicEdges: true,
        //   }
        // },


        // },
        // https://github.com/almende/vis/issues/2868
        // 성공, 계속 움직임
        // layout: {
        //   randomSeed: 191006,    // Optional; insert your value here
        //   improvedLayout: false
        // },
        //
        // physics: {
        //   enabled: false,
        //   stabilization: {
        //     iterations: 1,      // Change this to whatever is convenient for you
        //     onlyDynamicEdges: true,
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

        // 군집. -중력으로 퍼트리게.
        physics: {
          enabled: true,
          solver: 'barnesHut',
          barnesHut: {
            gravitationalConstant: -24300, // 중력값
            // springConstant: 0.115, // 스프링 강도
            // avoidOverlap: 1,
          },
        },


        // 링크선길이 없을때 군집.
        layout: { improvedLayout: false },
        // physics: {
        //   forceAtlas2Based: {
        //     gravitationalConstant: -126,
        //     springLength: 100,
        //     springConstant: 100
        //   },
        //   maxVelocity: 50,
        //   solver: "forceAtlas2Based",
        //   timestep: 0.35,
        //   stabilization: true
        // },

        interaction: {
          tooltipDelay: 200,
          // hideEdgesOnDrag: true,
        },

        nodes: {
          shape:'circle',
          scaling: {
            label: {
              enabled: true,
              min: 10,
              max: 50
            }
          },
          font: {
            size: 12,
            face: '"Noto Sans", "-apple-system","BlinkMacSystemFont","Malgun Gothic","맑은 고딕","helvetica","Apple SD Gothic Neo","sans-serif"',
            color: 'white'
          },
          borderWidth: 0,
          borderWidthSelected: 5,
          color: {
            background: '#ffcd00',
            highlight: '#25265f'
          },
          margin: {
            left: 10,
            right: 10
          }
        },
        edges: {
          color:{
            color: '#E9E9E9',
            highlight: '#C4C4C4'
          },
          // physics: true,
          width: 0.15,
          smooth: {
            type: 'straightCross'
          }
        }
      }
    }



  }),

  methods: {

    // 노드 선택시
    onSelectNode({ nodes }) {
      const [selectedNodeId] = nodes;
      this.setNodeFontColor(selectedNodeId, 'white');
    },

    // 노드 선택 해제시(다른 노드 선택 포함)
    onDeselectNode({previousSelection: { nodes } }) {
      const [prevSelectedNodeId] = nodes;
      this.setNodeFontColor(prevSelectedNodeId, 'black')
    },

    // 지정된 노드의 폰트 색상 변경
    setNodeFontColor(nodeId, fontColor='black') {
      this.network.nodes.find(node => node.id === nodeId).font.color =fontColor;
    },

    addNode() {
      const id = new Date().getTime();
      this.nodes.push({ id, label: "New node" });
    },

    // 그래프 생성 완료시
    onFinishDrawing() {
      if (!this.network.isLoaded) {
        this.network.isLoaded = true;
      }
    },

    // 지정된 노드 삭제
    // removeNode(nodeId) {
    //   this.nodes.splice(0, 1);
    // },

    addEdge() {
      const n1 = Math.floor(Math.random() * this.nodes.length);
      const n2 = Math.floor(Math.random() * this.nodes.length);
      this.edges.push({
        id: `${this.nodes[n1].id}-${this.nodes[n2].id}`,
        from: this.nodes[n1].id,
        to: this.nodes[n2].id
      });
    },

    // 네트워크 그래프 다운로드
    async downloadImage() {
      let elementById =document.querySelector('#visNetwork > div > canvas')
      await downloadHtmlToImg(elementById,'chart')

    }
  },


  }

</script>

<style >
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
div.vis-tooltip {
  color: white;
  border: 2px solid white;
  background-color: #0D6DB3;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  /*display: none;*/
  /*position: absolute;*/
  z-index: 100;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>