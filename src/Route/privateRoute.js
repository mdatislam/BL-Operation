
import DashBoard from '../DashBoard/DashBoard';
import PgRunList from '../DashBoard/PgRunList';
import PgRunUpdate from '../DashBoard/PgRunUpdate';
import About from '../Pages/HomePage/About';
export const privateRoute = [
  /* { path: "/Dashboard", name: "Data-Update", Component: DashBoard }, */
  { path: "/About", name: "About", Component: About },
  
  { path: "PgRunUpdate", name: "PgRunUpdate", Component: PgRunUpdate },
];