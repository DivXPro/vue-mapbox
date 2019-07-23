import layerEvents from "../../lib/layerEvents";
import mixin from "./layerMixin";

export default {
  name: "CustomLayer",
  mixins: [mixin],

  created() {
    this.$_deferredMount();
  },

  methods: {
    $_deferredMount() {
      this.$_addLayer();
      this.$_bindLayerEvents(layerEvents);
      this.map.off("dataloading", this.$_watchSourceLoading);
      this.initial = false;
    },

    $_addLayer() {
      let existed = this.map.getLayer(this.layerId);
      if (existed) {
        if (this.replace) {
          this.map.removeLayer(this.layerId);
        } else {
          this.$_emitEvent("layer-exists", { layerId: this.layerId });
          return existed;
        }
      }

      this.map.addLayer(this.layer, this.before);
      this.$_emitEvent("added", { layerId: this.layerId });
    }
  }
};
