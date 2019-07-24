<template>
  <div class="mgl-deck-wrapper">
    <canvas :id="id" />
  </div>
</template>

<script>
import { Deck } from "@deck/core";
const DEFAULT_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 10,
  bearing: 0,
  pitch: 0
};

export default {
  name: "Deck",

  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    layers: {
      type: Array,
      default: () => []
    },
    initialViewState: {
      type: Object,
      default: DEFAULT_VIEW_STATE
    },
    effects: {
      type: Array
    },
    isMapbox: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      initial: true,
      initialized: false,
      deck: null,
      map: null
    };
  },

  created() {
    //
  },

  mounted() {
    this.$on("load", map => {
      this.deck = new Deck({
        canvas: this.id,
        width: this.width,
        height: this.height,
        initialViewState: this.initalViewState,
        controller: true,
        onViewStateChange: ({ viewState }) => {
          if (this.isMapbox) {
            map.jumpTo({
              center: [viewState.longitude, viewState.latitude],
              zoom: viewState.zoom,
              bearing: viewState.bearing,
              pitch: viewState.pitch
            });
          }
        },
        layers: this.layers
      });
    });
  }
};
</script>

<style>
.mgl-map-wrapper {
  height: 100%;
  position: relative;
  width: 100%;
}

.mgl-map-wrapper .mapboxgl-map {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
