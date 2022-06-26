<template>
  <div>
    <h1>VueVis.js</h1>
    <p>
      A Vuejs 2 adapter for Visjs

    </p>
    <DataInfo></DataInfo>
    <div id="graph"></div>
    <network
        :key="network.key"
        id="visNetwork"
        class="network"
        ref="network"
        :nodes="this.network.nodes"
        :edges="this.network.edges"
        :options="this.network.options"
        @select-node="onSelectNode"
        @deselect-node="onDeselectNode"
        @after-drawing="onFinishDrawing"
    >
    </network>
    <div class="downloadBtn">
      <button type="button" @click="downloadImage">Download</button>
    </div>
    <button @click="removeCurrSelectedNode">Remove Node</button>

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
import { fileDownload} from "@/lib/common/html2canvas";
import node from "@/jsonData/node2.json"
import link from "@/jsonData/link2.json"
const nodeJson = node;
const linkJson = link;

const defNodes = Object.keys(nodeJson).map(key => {
  return {
    id: key,
    title: `${key} : ${nodeJson[key]}`,
    label: key,
    value: nodeJson[key],
    font: {
      color: 'black',
      // size: Math.min(100,Math.max((1000*nodeJson[key]), 14))
    },
  }
})
console.log('nodesParsed', defNodes)

const defLink = linkJson.map(link => {
  return {

    // length: (link[0]),
    length: link[0] * 10000,
    from: link[1].split(',')[0],
    to: link[1].split(',')[1],
    title: `from: ${link[1].split(',')[0]}, to: ${link[1].split(',')[1]}`,
  }
})
console.log('linkParsed', defLink)



export default {
  name: "VueVis",

  components: {
    DataInfo,
    Network
  },

  data: () => ({
    networkEvents: "",
    network: {
      key: 0,
      nodes: defNodes.slice(0),
      edges: defLink.slice(0),
      isLoaded: false, // 그래프 초기로딩 완료 여부
      selectedNodeId: null, // 선택된 노드 id
      canvas : null,

      // canvas 데이터 setter
      setCanvas(canvas) {
        this.canvas = canvas
      },

      // 이미지 다운로드
      async downloadImg(fileName) {
        let dataURL = this.canvas.toDataURL();

        const blob = await (await fetch(dataURL)).blob();

        fileDownload(blob, fileName)
      },

      options: {
        physics: {
          enabled: true,
          solver: 'barnesHut',
          barnesHut: {
            gravitationalConstant: -80000, // 중력값
            // springConstant: 0.115, // 스프링 강도
            // avoidOverlap: 1,
          },
          minVelocity: 10,
        },

        // 링크선길이 없을때 군집.
        layout: { improvedLayout: false },

        interaction: {
          tooltipDelay: 200,
        },

        // 노드
        nodes: {
          shape:'circle',
          scaling: {
            min: 30,
            max: 150,
            label: {
              enabled: true,
              min: 10,
              max: 30
            }
          },
          font: {
            // size: 12,
            face: '"Noto Sans", "-apple-system","BlinkMacSystemFont","Malgun Gothic","맑은 고딕","helvetica","Apple SD Gothic Neo","sans-serif"',
            color: 'white'
          },
          borderWidth: 0,
          borderWidthSelected: 5,
          color: {
            background: '#ffcd00',
            highlight: '#25265f'
          },
        },

        // 링크
        edges: {
          color:{
            color: '#E9E9E9',
            highlight: '#C4C4C4'
          },
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
    onSelectNode(param) {
      console.log('onSelectNode', param)
      const [selectedNodeId] = param.nodes;
      const foundNode = this.findNode(selectedNodeId);
      this.setNodeFontColor(foundNode, 'white');
      this.setSelectedNodeId(selectedNodeId)
    },

    // 노드 선택 해제시(다른 노드 선택 포함)
    onDeselectNode({ previousSelection: { nodes } }) {
      if (!nodes) return;
      const [prevSelectedNodeId] = nodes;
      const foundNode = this.findNode(prevSelectedNodeId);
      this.setNodeFontColor(foundNode, 'black')
    },

    // 현재 선택된 노드아이디 변경
    setSelectedNodeId(nodeId) {
      console.log('',)
      if (nodeId) {
        this.network.selectedNodeId = nodeId;
      }
    },

    // 지정된 노드의 폰트 색상 변경
    setNodeFontColor(node, fontColor='black') {
      if (node) {
        node.font.color = fontColor;
      }
    },

    // 그래프 생성 완료시
    onFinishDrawing(ctx) {
      if (!this.network.isLoaded) {
        this.network.isLoaded = true;
      }

      // this.network.canvas = ctx.canvas
      this.network.setCanvas(ctx.canvas)
      // const dataURL = ctx.canvas.toDataURL();
      // this.network.imgDataUrl = dataURL
    },

    // 현재 선택된 노드 삭제
    removeCurrSelectedNode() {

      const foundIndex = this.network.nodes.findIndex(node => node.id === this.network.selectedNodeId);
      if (foundIndex >= 0) {
        this.$refs.network.deleteSelected()
        this.network.nodes.splice(foundIndex, 1)
      }

    },

    // 지정된 노드 객체 반환
    findNode(nodeId) {
      if (!nodeId) return null;
      console.log('nodeId',nodeId)
      return this.$refs.network.getNode(nodeId)
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

    // 네트워크 그래프 다운로드
    downloadImage() {

      this.network.downloadImg('네트워크 그래프');

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