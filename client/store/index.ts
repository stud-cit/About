import * as root from './root';
export type RootState = root.State;

export default {
  strict: false,
  state: root.state,
  getters: root.getters,
  mutations: root.mutations,
  actions: root.actions,
};
