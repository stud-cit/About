import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export interface State {
  [x: string]: any;
}

interface PageModel {
  id: number;
  title: string
  to: string;
  img: string;
  lazyImg: string;
}

export const state = (): State => ({
  isShowLoader: true,
  pageId: 0,
  pages: [
    { 
      id: 1,
      title: 'About Us',
      to: 'about',
      img: '/images/background/about.png',
      lazyImg: 'https://picsum.photos/id/1/60',
      cover: '/images/background/about.png',
    },
    {
      id: 2,
      title: 'Offers',
      to: 'offers',
      img: '/images/background/offers.png',
      lazyImg: 'https://picsum.photos/id/3/60',
      cover: '/images/background/offers.png',
    },
    {
      id: 3,
      title: 'Our Staff',
      to: 'our-staff',
      img: '/images/background/our-staff.png',
      lazyImg: 'https://picsum.photos/id/4/60',
      cover: '/images/background/our-staff.png',
    },
    {
      id: 4,
      title: 'Portfolio',
      to: 'portfolio',
      img: '/images/background/portfolio.png',
      lazyImg: 'https://picsum.photos/id/5/60',
      cover: '/images/background/portfolio.png',
    },
  ],
  about: {
    previewTitle: 'Student centr of information technology',
    previewSubtitle: 'We can make this world better.',
    previewDescription:'',
    slides: [
      {
        title: 'Student centr of information technology',
        content: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.'
      },
      {
        title: 'Student centr of information technology',
        content: 'The Woodman. Lorem'
      },
      {
        title: 'Student centr of information technology',
        content: 'The Woodman. Lorem'
      },
    ]
  },
  weOffers:
    {
      previewTitle:'Do you know what we can?',
      previewSubtitle:'What we do? What we support?',
      previewDescription:'Our possibilities are limited only by our imagination.',
      representation: [
        {

          title:'DEVELOPMENT OF WEB ',
          text:'A Web developer is a kind of programmer who specializes in the development of applications relating to the World Wide Web or distributed network applications, which typically run protocols like HTTP from a Web server to a client browser using associated programming languages like HTML/CSS, C#, Ruby and PHP to name a few.',
          img:'~/assets/images/weOffer/1.jpg',
          positionCard:'start'
        },
        {
          title:'CREATING SOFTWARE FOR REAL-WORLD TASKS',
          text:'Programming software is a software which helps the programmer in developing other software. Compilers, assemblers, debuggers, interpreters etc. are examples of programming software. Integrated development environments (IDEs) are combinations of all these software.',
          img:'.~/assets/images/weOffer/2.jpg',
          positionCard:'end'
        },
        {
          title:'DESIGNING INFORMATION SYSTEMS OF VARIOUS COMPLEXITY',
          text:'Information system is a system composed of people and computers that processes or interprets information. The term is also sometimes used in more restricted senses to refer to only the software used to run a computerized database or to refer to only a computer system.',
          img:'~/assets/images/weOffer/3.jpg',
          positionCard:'end'
        },
      ],
    },
  
  ourStaff: {
    previewTitle:'Many people who can easily realize all things which you wish.',
    previewSubtitle:'',
    previewDescription:'Together we can more than one by one.',
    representation:[
      {
        id: 1,
        name: 'Kirk Philips',
        position: 'Frontend developer',
        stack: 'Proficient in HTML + CSS, JS',
        img_src: '/images/ourStaff/team.jpg',
      },
      {
        id: 2,
        name: 'Kirk Philips2',
        position: 'Designer',
        stack: 'Proficient in HTML + CSS, JS',
        img_src: '/images/ourStaff/team.jpg',
      },
      {
        id: 3,
        name: 'Kirk Philip3',
        position: 'Designer',
        stack: 'Proficient in HTML + CSS, JS',
        img_src: '/images/ourStaff/team.jpg',
      },
      {
        id: 4,
        name: 'Kirk Philips4',
        position: 'Designer',
        stack: 'Proficient in HTML + CSS, JS',
        img_src: '/images/ourStaff/team.jpg',
      },
      {
        id: 5,
        name: 'Kirk Philips5',
        position: 'Designer',
        stack: 'Proficient in HTML + CSS, JS',
        img_src: '/images/ourStaff/team.jpg',
      },
    ],
  },
  portfolio: {
    previewTitle:'Do you know what we can?',
    previewSubtitle:'What we have made?',
    previewDescription:'Our projects is one of the best',
    projects: [
      {
        title: 'Department of Social Work of Sumy State University',
        cover: '/images/portfolio/SOC.png',
        link: 'http://soc.sumdu.edu.ua/',
      },
      {
        title: 'Practice and internship search platform of Sumy State University',
        cover: '/images/portfolio/JOB.png',
        link: 'http://job-test.sumdu.edu.ua/',
      },
      {
        title: 'Online assessment of the quality of the educational process at Sumy State University',
        cover: '/images/portfolio/AC.png',
        link: 'http://ac.sumdu.edu.ua/',
      },
    ],
  },
  showContactBar: false,
  contacts: {
    motto:'Speed, quality, simplicity',
    email:'STUDCITMAIL@GMAIL.COM',
    phone:'+380 98 43 70 202',
    street:'Ukraine, Sumy, st. Rimsky-Korsakov, 2',
    office:'Sumy State University, Electrotechnical Corps, cab. ET-504'
  }
});

export const getters: GetterTree<RootState, RootState> = {
  getContactBarVisibility(state: State) {
    return state.showContactBar;
  },
  getPageCover(state: State) {
    const currentPage = state.pages.find( ({id}: PageModel) => id === state.pageId);
    return currentPage ? currentPage.cover : null;
  },
  getPageStage(state: State) {
    return state.pages;
  },
  getPageId(state: State) {
    return state.pageId;
  },
  getPageRouteById(state: State) {
    return (index: number) => {
      const changedIndex = index > 4 ? 1 : index < 1 ? 4 : index;
      const currentPage = state.pages.find( ({id}: PageModel) => id === changedIndex)
      return currentPage ? currentPage.to : '';
    }
  },
  getProjectsStage(state: State) {
    return state.portfolio.projects;
  },
  getAboutStage(state: State) {
    return state.about;
  },
  getOffersStage(state: State) {
    return state.weOffers;
  },
  getStaffStage(state: State) {
    return state.ourStaff;
  },
  getPortfolioStage(state: State) {
    return state.portfolio;
  },
  getContactStage(state: State) {
    return state.contacts;
  },
};

export const actions: ActionTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {
  hideLoader(state: RootState): void {
    state.isShowLoader = false;
  },
  changePageId(state: RootState, pageId: number): void {
    state.pageId = pageId;
  },
  changeContactBar(state: RootState, visibility: boolean): void {
    state.showContactBar = visibility;
  },
};
