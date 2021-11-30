/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

interface IRoute{
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  exact?: boolean
};

const routes: IRoute[] = [
  {
    path: '/app', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/keys', // the url
    icon: 'OutlineCogIcon', // the component being exported from icons/index.js
    name: 'API Key Management', // name that appear in Sidebar
  },
  {
    path: '/app/infos', // the url
    icon: 'OutlinePersonIcon', // the component being exported from icons/index.js
    name: 'Bio Infos Management', // name that appear in Sidebar
  },
];

export type {IRoute};
export default routes;
