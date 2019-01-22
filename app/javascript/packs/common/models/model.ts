import Vue from "vue/dist/vue";
import trackable from "../classMixins/trackable";
import Guid from "../helpers/guid";

class Model {
  id: string;
  parent: any;
  _hasChanged: boolean = false;
  store: any;
  except: string[] = ['except', 'include', 'parent', 'store'];
  include: string[] = [];

  constructor() {
    this.defineProperty('id', Guid.create())
  }


  get EMBEDDED_MODELS(): {[key: string]: Function} {
    return {};
  }

  setStore(store) {
    this.store = store;
  }

  loadFromJson(json, options: any = {}) {
    options.except = options.except || [];
    options.only = options.only || [];
    for (let key in json) {
      if (options.except.includes(key) || options.only.length > 0 && !options.only.includes(key)) {
        continue;
      }

      if (Object.keys(this.EMBEDDED_MODELS).includes(key)) {
        this.loadEmbeddedModel(key, json);
      } else {
        // this.defineProperty(key, json[key]);
        Vue.set(this, `_${key}`, json[key]);
      }
    }

    return this;
  }

  defineProperty(key: string, initialValue: any, trackInitialValue: boolean = false) {
    let _key = '_' + key;

    Object.defineProperty(this, key, {
      get() {
        return this[_key];
      },

      set(newVal) {
        let currVal = this[_key];
        if (currVal === newVal) {
          return;
        }

        this[_key] = newVal;

        this.trackChange(key, currVal, newVal);
      }
    });

    if (trackInitialValue) {
      this[key] = initialValue;
    } else {
      this[_key] = initialValue;
    }
  }

  asJson(options: any = {except: this.except}) {
    window.AppConfig.mergeJson(options, {except: this.except});
    let json = {};
    let ownPropertyNames = Object.getOwnPropertyNames(this);
    for (let i = 0; i < ownPropertyNames.length; i++) {
      let propertyName = ownPropertyNames[i];
      if (!options.except || !options.except.includes(propertyName)) {
        if (!propertyName.startsWith('_') || this.include.includes(propertyName)) {
          if (Array.isArray(this[propertyName]) && this[propertyName][0] instanceof Model) {
            json[`${propertyName}_attributes`] = this[propertyName].map(model => model.asJson());
          } else if (this[propertyName] instanceof Model) {
            json[`${propertyName}_attributes`] = this[propertyName].asJson();
          } else {
            json[propertyName] = this[propertyName];
          }
        }
      }
    }
    return json;
  }

  private loadEmbeddedModel(key, json): void {
    this[key] = this.buildEmbeddedModel(key, json);
  }

  private buildEmbeddedModel(key, json): any {
    let result = null;
    if (Array.isArray(json[key])) {
      let newIds = json[key].map(k => k.id);
      let deletedItems = this[key].filter(item => !newIds.includes(item.id));
      deletedItems.forEach(item => {
        let index = this[key][this[key].indexOf(item)];
        Vue.delete(this[key], index);
      });
      result = json[key].map(modelJson => {
        let obj = this.buildModel(key, modelJson);
        Vue.set(this[key], obj.id, obj);
        return obj;
      });
    } else {
      let obj = this.buildModel(key, json[key]);
      Vue.set(this, key, obj);
      result = obj;
    }

    return result;
  }

  private buildModel(key, json) {
    let obj = this[key].find(o => o.id === json.id) || this.EMBEDDED_MODELS[key](this, json);
    obj.parent = this;
    return obj.loadFromJson(json);
  }

  get hasChanged(): boolean {
    return this._hasChanged;
  }

  set hasChanged(newVal) {
    this._hasChanged = newVal;
    if (this.parent) {
      console.log(this.parent)
      this.parent.hasChanged = this.parent.hasChanged || newVal;
    }
  }
}

// Mixin trackable to Model
trackable.call(Model.prototype);

export default Model;
