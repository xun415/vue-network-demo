<template>
  <div>
    <h1>Vis.js</h1>
    <p>
      A Vuejs 2 adapter for Visjs

    </p>
    <DataInfo></DataInfo>
    <div id="graphDiv"></div>
    <div class="downloadBtn">
      <button type="button" @click="downloadImage">Download</button>
    </div>
    <button @click="removeCurrSelectedNode">Remove Node</button>

  </div>
</template>

<script>
import { Network } from 'vis-network'
import DataInfo from "@/components/DataInfo";
import "vis-network/styles/vis-network.css";
import {downloadHtmlToImg} from "@/lib/common/html2canvas";
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
      color: 'black'
    }
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
window.vis = null


export default {
  name: "VisJs",

  components: {
    DataInfo,
  },

  mounted() {
    const graphDiv = document.getElementById('graphDiv');
    const data = {nodes: this.network.nodes, edges: this.network.edges}
    const network = new Network(graphDiv, data ,this.network.options);
    network.on('selectNode', this.onSelectNode)
    network.on('dragStart', this.onDragStart)
    network.on('deselectNode', this.onDeselectNode)
    network.on('afterDrawing', this.onFinishDrawing)
    this.network.ref = network
    window.vis = network
  },

  data: () => ({
    networkEvents: "",
    network: {
      ref: null,
      nodes: defNodes.slice(0),
      edges: defLink.slice(0),
      isLoaded: false, // 그래프 초기로딩 완료 여부
      selectedNodeId: null, // 선택된 노드 id
      manipulation: {
        enabled: true,
      },
      options: {
        // 군집. -중력으로 퍼트리게.
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
        // manipulation: {
        //   deleteNode: true
        // },
        nodes: {
          shape:'circle',
          scaling: {
            min: 20,
            max: 100,
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
          // margin: {
          //   left: 10,
          //   right: 10
          // }
        },
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
    onSelectNode({ nodes }) {
      if (!nodes || !nodes.length) return;
      console.log('onSelectNode',nodes)
      const [selectedNodeId] = nodes;
      console.log('selectedNodeId', selectedNodeId)
      const foundNode = this.findNode(selectedNodeId);
      this.setNodeFontColor(foundNode, 'white');
      this.setSelectedNodeId(selectedNodeId)
    },

    // 노드 선택 해제시(다른 노드 선택 포함)
    onDeselectNode({ previousSelection: { nodes } }) {
      if (!nodes) return;
      const [prevNode] = nodes;
      // console.log('prevNodeId',prevNodeId)
      this.setNodeFontColor(prevNode,'black')

      // if (!nodes) return;
      // const [prevSelectedNodeId] = nodes;
      // const foundNode = this.findNode(prevSelectedNodeId);
      // this.setNodeFontColor(foundNode, 'black')
    },

    onDragStart(param) {
      if (!param.nodes) return;
      // 현재 노드 폰트컬러 변경
      this.onSelectNode(param)

      // 클릭없이 드래깅되는 경우 대비
      const [draggedNodeId] = param.nodes;
      this.resetNodeFontColor(draggedNodeId)

    },

    // 폰트색상 초기화
    resetNodeFontColor(exceptNodeId) {
      // const nodes = this.network.ref.body.nodes;
      const nodes = window.vis.body.nodes
      const nodeKeys = Object.keys(nodes);
      nodeKeys.forEach(key => {
        if (nodes[key].options.font.color === 'white' && exceptNodeId !== nodes[key].id) {
          this.setNodeFontColor(nodes[key], 'black')
        }
      })
    },

    // 현재 선택된 노드아이디 변경
    setSelectedNodeId(nodeId) {
      if (nodeId) {
        this.network.selectedNodeId = nodeId;
      }
    },

    // 지정된 노드의 폰트 색상 변경
    setNodeFontColor(node, fontColor='black') {
      console.log('setColor node:', node)
      node.setOptions({
        font: {
          color: fontColor
        }
      })
      // console.log('orgColor', color)
      // eslint-disable-next-line no-unused-vars
      // color = fontColor;

      // console.log(node)
      // if (node) {
      //   node.font.color = fontColor;
      // }
    },

    // 그래프 생성 완료시
    onFinishDrawing() {
      if (!this.network.isLoaded) {
        this.network.isLoaded = true;
      }
    },

    // 현재 선택된 노드 삭제
    removeCurrSelectedNode() {
      window.vis.deleteSelected();
      window.vis.redraw()
      console.log('window.vis',window.vis)
      // this.network.ref.deleteSelected();
      // this.$refs.network.deleteSelected()
      const [selectedNodeId] = this.network.ref.getSelectedNodes();
      const nodeIdx = this.network.nodes.findIndex(node => node.id === selectedNodeId);
      this.network.nodes = this.network.nodes.splice(nodeIdx, 1)
      // // console.log('this.$refs.network.nodes.splice(nodeIdx, 1)', this.$refs.network.nodes.splice(nodeIdx, 1))
      // //
      // //
      // // console.log('network', this.$refs.network)
      // // this.$refs.network.redraw();
      // // if (!this.network.selectedNodeId) return;
      //
      // const foundIndex = this.network.nodes.findIndex(node => node.id === selectedNodeId);
      // // const foundIndex = this.network.ref.nodes.findIndex(node => node.id === selectedNodeId);
      // // console.log('foundIndex',foundIndex)
      // if (foundIndex >= 0) {
      //   this.network.nodes.splice(foundIndex, 1)
      //   console.log('after delete', this.network.ref)
      //   // this.$refs.network.deleteSelected()
      //   //
      // }
    },

    // 지정된 노드 객체 반환
    findNode(nodeId) {
      if (!nodeId) return null;
      return window.vis.body.nodes[nodeId];
      // return this.network.ref.body.nodes[nodeId]
      // return this.network.nodes.find(node => node.id === nodeId)
      // console.log('nodeId',nodeId)
      // console.log('this.network.ref.findNode(nodeId)', this.network.ref.findNode(nodeId))
      // return this.network.ref.findNode(nodeId)
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
#graphDiv {
  border: 1px solid black;
  width: 80vw;
  height: 80vh;
}
</style>