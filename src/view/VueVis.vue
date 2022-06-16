<template>
  <div>
    <h1>VueVis.js</h1>
    <p>
      A Vuejs 2 adapter for Visjs

    </p>
    <DataInfo></DataInfo>
    <network
        class="network"
        ref="network"
        :nodes="network.nodes"
        :edges="network.edges"
        :options="network.options"
        @click="networkEvent('click')"
        @double-click="networkEvent('doubleClick')"
        @oncontext="networkEvent('oncontext')"
        @hold="networkEvent('hold')"
        @release="networkEvent('release')"
        @select="networkEvent('select')"
        @select-node="networkEvent('selectNode')"
        @select-edge="networkEvent('selectEdge')"
        @deselect-node="networkEvent('deselectNode')"
        @deselect-edge="networkEvent('deselectEdge')"
        @drag-start="networkEvent('dragStart')"
        @dragging="networkEvent('dragging')"
        @drag-end="networkEvent('dragEnd')"
        @hover-node="networkEvent('hoverNode')"
        @blur-node="networkEvent('blurNode')"
        @hover-edge="networkEvent('hoverEdge')"
        @blur-edge="networkEvent('blurEdge')"
        @zoom="networkEvent('zoom')"
        @show-popup="networkEvent('showPopup')"
        @hide-popup="networkEvent('hidePopup')"
        @start-stabilizing="networkEvent('startStabilizing')"
        @stabilization-progress="networkEvent('stabilizationProgress')"
        @stabilization-iterations-done="
        networkEvent('stabilizationIterationsDone')
      "
        @stabilized="networkEvent('stabilized')"
        @resize="networkEvent('resize')"
        @init-redraw="networkEvent('initRedraw')"
        @before-drawing="networkEvent('beforeDrawing')"
        @after-drawing="networkEvent('afterDrawing')"
        @animation-finished="networkEvent('animationFinished')"
        @config-change="networkEvent('configChange')"
        @nodes-mounted="networkEvent('nodes-mounted')"
        @nodes-add="networkEvent('nodes-add')"
        @nodes-update="networkEvent('nodes-update')"
        @nodes-remove="networkEvent('nodes-remove')"
        @edges-mounted="networkEvent('edges-mounted')"
        @edges-add="networkEvent('edges-add')"
        @edges-update="networkEvent('edges-update')"
        @edges-remove="networkEvent('edges-remove')"
    >
    </network>
    <button @click="addNode">Add node</button>
    <button @click="addEdge">Add edge</button>
    <button @click="resetNetwork">Reset Network</button>
    <button @click="removeNode">Remove Node</button>
    <button @click="removeEdge">Remove Edge</button>
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
const nodes = [
  { id: '디자인', label: '디자인', value: 0.22137995638153773 },
  { id: '제품', label: '제품', value: 0.06604884464492325 },
  { id: '냉장고', label: '냉장고', value: 0.08333333333333333 },
  { id: '스타일', label: '스타일', value: 0.08333333333333333 },
  { id: '하나', label: '하나', value: 0.07636080536975727 },
  { id: '생각', label: '생각', value: 0.08701303662200743 },
  { id: '공간', label: '공간', value: 0.09411975018853684 },
  { id: '사용', label: '사용', value: 0.09411975018853684 },
  { id: '인테리어', label: '인테리어', value: 0.06604884464492324 },
  { id: '다양', label: '다양', value: 0.039381539923353186 },
  { id: '제작', label: '제작', value: 0.039381539923353186 },
  { id: '시간', label: '시간', value: 0.0494792654464041 }
]

export default {
  name: "VueVis",

  components: {
    DataInfo,
    Network
  },

  data: () => ({
    networkEvents: "",

    network: {
      nodes: nodes,
      edges: [
        { from: '디자인' ,to: '제품', length: 0.054665  * 100000 },
        { from: '스타일' ,to: '냉장고', length: 0.049953  * 100000 },
        { from: '하나' ,to: '생각', length: 0.049325  * 100000 },
        { from: '공간' ,to: '디자인', length: 0.048068  * 100000 },
        { from: '하나' ,to: '디자인', length: 0.046497  * 100000 },
        { from: '사용' ,to: '디자인', length: 0.046183  * 100000 },
        { from: '공간' ,to: '인테리어', length: 0.045869  * 100000 },
        { from: '인테리어' ,to: '디자인', length: 0.043984  * 100000 },
        { from: '다양' ,to: '디자인', length: 0.043041  * 100000 },
        { from: '제작' ,to: '디자인', length: 0.041784  * 100000 },
        { from: '사용' ,to: '제품', length: 0.041470  * 100000 },
        { from: '공간' ,to: '사용', length: 0.041156  * 100000 },
        { from: '시간' ,to: '생각', length: 0.040528 * 100000  }
      ],

      options: {

        nodes: {

          shape: "circle",
          scaling: {
            label: {
              enabled: true,
              min: 50,
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
        // physics: {
        //   barnesHut: {
        //     "gravitationalConstant": -3900,
        //     "centralGravity": 0
        //   },
        //   minVelocity: 1
        // },

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
    resetNetwork() {
      this.nodes = [
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" },
        { id: 4, label: "Node 4" },
        { id: 5, label: "Node 5" }
      ];
      this.edges = [
        { id: 1, from: 1, to: 3 },
        { id: 2, from: 1, to: 2 },
        { id: 3, from: 2, to: 4 },
        { id: 4, from: 2, to: 5 },
        { id: 5, from: 3, to: 3 }
      ];
      this.options = {};
    },
    removeNode() {
      this.nodes.splice(0, 1);
    },
    removeEdge() {
      this.edges.splice(0, 1);
    }
  }

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
  height: 400px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>