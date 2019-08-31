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
      img: `/image/background/about.png`,
      lazyImg: `https://picsum.photos/id/1/60`,
    },
    {
      title: 'Offers',
      to: `offers`,
      img: `/image/background/offers.png`,
      lazyImg: `https://picsum.photos/id/3/60`,
    },
    {
      title: 'Our Staff',
      to: `our-staff`,
      img: `/image/background/our-staff.png`,
      lazyImg: `https://picsum.photos/id/4/60`,
    },
    {
      title: 'Portfolio',
      to: `portfolio`,
      img: `/image/background/portfolio.png`,
      lazyImg: `https://picsum.photos/id/5/60`,
    },
  ],
  projects: [
  {
    "title": "Section0",
    "cover": "https://picsum.photos/id/0/1980",
    "lazyCover": "https://picsum.photos/id/0/250",
    "link": "https://picsum.photos/id/0/1980",
    "team": [
      {
        "name": "fullName0",
        "avatar": "https://picsum.photos/id/0/60"
      },
      {
        "name": "fullName1",
        "avatar": "https://picsum.photos/id/0/60"
      },
      {
        "name": "fullName2",
        "avatar": "https://picsum.photos/id/0/60"
      },
      {
        "name": "fullName3",
        "avatar": "https://picsum.photos/id/0/60"
      },
      {
        "name": "fullName4",
        "avatar": "https://picsum.photos/id/0/60"
      },
      {
        "name": "fullName5",
        "avatar": "https://picsum.photos/id/0/60"
      }
    ]
  },
  {
    "title": "Section1",
    "cover": "https://picsum.photos/id/10/1980",
    "lazyCover": "https://picsum.photos/id/10/250",
    "link": "https://picsum.photos/id/10/1980",
    "team": [
      {
        "name": "fullName0",
        "avatar": "https://picsum.photos/id/10/60"
      },
      {
        "name": "fullName1",
        "avatar": "https://picsum.photos/id/10/60"
      },
      {
        "name": "fullName2",
        "avatar": "https://picsum.photos/id/10/60"
      },
      {
        "name": "fullName3",
        "avatar": "https://picsum.photos/id/10/60"
      },
      {
        "name": "fullName4",
        "avatar": "https://picsum.photos/id/10/60"
      },
      {
        "name": "fullName5",
        "avatar": "https://picsum.photos/id/10/60"
      }
    ]
  },
  {
    "title": "Section2",
    "cover": "https://picsum.photos/id/20/1980",
    "lazyCover": "https://picsum.photos/id/20/250",
    "link": "https://picsum.photos/id/20/1980",
    "team": [
      {
        "name": "fullName0",
        "avatar": "https://picsum.photos/id/20/60"
      },
      {
        "name": "fullName1",
        "avatar": "https://picsum.photos/id/20/60"
      },
      {
        "name": "fullName2",
        "avatar": "https://picsum.photos/id/20/60"
      },
      {
        "name": "fullName3",
        "avatar": "https://picsum.photos/id/20/60"
      },
      {
        "name": "fullName4",
        "avatar": "https://picsum.photos/id/20/60"
      },
      {
        "name": "fullName5",
        "avatar": "https://picsum.photos/id/20/60"
      }
    ]
  },
  {
    "title": "Section3",
    "cover": "https://picsum.photos/id/30/1980",
    "lazyCover": "https://picsum.photos/id/30/250",
    "link": "https://picsum.photos/id/30/1980",
    "team": [
      {
        "name": "fullName0",
        "avatar": "https://picsum.photos/id/30/60"
      },
      {
        "name": "fullName1",
        "avatar": "https://picsum.photos/id/30/60"
      },
      {
        "name": "fullName2",
        "avatar": "https://picsum.photos/id/30/60"
      },
      {
        "name": "fullName3",
        "avatar": "https://picsum.photos/id/30/60"
      },
      {
        "name": "fullName4",
        "avatar": "https://picsum.photos/id/30/60"
      },
      {
        "name": "fullName5",
        "avatar": "https://picsum.photos/id/30/60"
      }
    ]
  },
  {
    "title": "Section4",
    "cover": "https://picsum.photos/id/40/1980",
    "lazyCover": "https://picsum.photos/id/40/250",
    "link": "https://picsum.photos/id/40/1980",
    "team": [
      {
        "name": "fullName0",
        "avatar": "https://picsum.photos/id/40/60"
      },
      {
        "name": "fullName1",
        "avatar": "https://picsum.photos/id/40/60"
      },
      {
        "name": "fullName2",
        "avatar": "https://picsum.photos/id/40/60"
      },
      {
        "name": "fullName3",
        "avatar": "https://picsum.photos/id/40/60"
      },
      {
        "name": "fullName4",
        "avatar": "https://picsum.photos/id/40/60"
      },
      {
        "name": "fullName5",
        "avatar": "https://picsum.photos/id/40/60"
      }
    ]
  },
  {
    "title": "Section5",
    "cover": "https://picsum.photos/id/50/1980",
    "lazyCover": "https://picsum.photos/id/50/250",
    "link": "https://picsum.photos/id/50/1980",
    "team": [
      {
        "name": "fullName0",
        "avatar": "https://picsum.photos/id/50/60"
      },
      {
        "name": "fullName1",
        "avatar": "https://picsum.photos/id/50/60"
      },
      {
        "name": "fullName2",
        "avatar": "https://picsum.photos/id/50/60"
      },
      {
        "name": "fullName3",
        "avatar": "https://picsum.photos/id/50/60"
      },
      {
        "name": "fullName4",
        "avatar": "https://picsum.photos/id/50/60"
      },
      {
        "name": "fullName5",
        "avatar": "https://picsum.photos/id/50/60"
      }
    ]
  }
]
});

export const getters: GetterTree<RootState, RootState> = {
  getPageStage(stage) {
    return stage.pages
  },

  getProjectsStage(stage) {
    return stage.projects
  }
};

export const actions: ActionTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {};
