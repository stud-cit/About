import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export interface State {
  [x: string]: any;
}
export const state = (): State => ({});

export const getters: GetterTree<RootState, RootState> = {};

export const actions: ActionTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {};
