import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
      },
      {
        path: 'question-sets',
        component: () => import('pages/questionSets/QuestionSets.vue'),
      },
      {
        path: 'question-sets/:id/edit',
        component: () => import('pages/questionSets/Editor.vue'),
      },
      {
        path: 'tests/:testShortId',
        components: {
          default: () => import('pages/tests/Test.vue'),
          toolbarContent: () => import('components/test/Toolbar.vue'),
        },
        children: [
          {
            path: 'questions',
            component: () => import('pages/tests/tabs/Questions.vue'),
            meta: { testTab: 'questions' },
          },
          {
            path: 'sheets',
            component: () => import('pages/tests/tabs/Sheets.vue'),
            meta: { testTab: 'sheets' },
          },
          {
            path: 'scans',
            component: () => import('pages/tests/tabs/Scans.vue'),
            meta: { testTab: 'scans' },
            children: [
              {
                path: '/',
                components: {}, // TODO: Remove if possible
              },
              {
                path: ':scanShortId',
                components: {},
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
