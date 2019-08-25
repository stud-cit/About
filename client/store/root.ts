import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export interface State {
  [x: string]: any;
}
export const state = (): State => ({
  pages: [
    {
      title: 'About Us',
      to: `about`,
      img: `https://picsum.photos/id/1/720`,
      lazyImg: `https://picsum.photos/id/1/60`,
    },
    {
      title: 'Contact',
      to: `contact`,
      img: `https://picsum.photos/id/2/720`,
      lazyImg: `https://picsum.photos/id/2/60`,
    },
    {
      title: 'Offers',
      to: `offers`,
      img: `https://picsum.photos/id/3/720`,
      lazyImg: `https://picsum.photos/id/3/60`,
    },
    {
      title: 'Our Staff',
      to: `our-staff`,
      img: `https://picsum.photos/id/4/720`,
      lazyImg: `https://picsum.photos/id/4/60`,
    },
    {
      title: 'Portfolio',
      to: `portfolio`,
      img: `https://picsum.photos/id/5/720`,
      lazyImg: `https://picsum.photos/id/5/60`,
    },
  ]
});

export const getters: GetterTree<RootState, RootState> = {
  getPageStage(stage) {
    return stage.pages
  }
};

export const actions: ActionTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {};
