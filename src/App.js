import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserEdit, UserList} from './components/users/Users';
import {UserPlanList} from './components/users/UserPlan';
import {PromoCreate, PromoEdit, PromoList} from './components/payments/Promo';
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList
} from './components/partners/Category';
import {
  StudioCreate,
  StudioEdit,
  StudioList
} from './components/partners/Studio';
import {
  ClassesCreate,
  ClassesEdit,
  ClassesList
} from './components/classes/Classes';
import {
  DistrictCreate,
  DistrictEdit,
  DistrictList
} from './components/partners/District';
import {CityCreate, CityEdit, CityList} from './components/partners/City';
import {
  CountryCreate,
  CountryEdit,
  CountryList
} from './components/partners/Country';
import {
  ServiceCreate,
  ServiceEdit,
  ServiceList
} from './components/partners/Service';
import {
  UserClassList,
  UserClassCreate,
  UserClassListNoDelete
} from './components/userClass/UserClass';
import {PlansEdit, PlansList} from './components/payments/Plans';
import {LevelCreate, LevelEdit, LevelsList} from './components/users/Levels';
import {BillEdit, BillingList} from './components/payments/Billing';
import {
  UserVideoList,
  VideoCategoryCreate,
  VideoCategoryEdit,
  VideoCategoryList,
  VideoCreate,
  VideoEdit,
  VideoList
} from './components/classes/Videos';
import UserIcon from '@material-ui/icons/People';
import {
  AccountBalance,
  AddLocation,
  AttachMoney,
  Autorenew,
  BarChartTwoTone,
  Business,
  CardGiftcard,
  CheckBox,
  Flag,
  Lock,
  Message,
  MonetizationOn,
  PlayCircleFilled,
  Redeem,
  Schedule,
  TrendingUp,
  VideoLibrary
} from '@material-ui/icons';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import {UserClassStudioList} from './components/userClass/UserClassStudio';
import {servicePrefix} from './components/util/constants';
import authProvider from './components/util/authProvider';
import {
  EquipmentCreate,
  EquipmentEdit,
  EquipmentList
} from "./components/classes/Equipment";
import {BbvaList} from "./components/misc/Bbva";
import {PacificoList} from "./components/misc/Pacifico";
import {
  ProgramCreate,
  ProgramEdit,
  ProgramList
} from "./components/classes/Program";
import {UserProgramList} from "./components/users/UserProgram";
import Dashboard from "./components/misc/Dashboard";
import {
  SaasCategoryCreate,
  SaasCategoryEdit,
  SaasCategoryList
} from "./components/partners/SaasCategory";
import {UserRewardEdit, UserRewardList} from "./components/users/UserReward";
import {UserClassSummary} from "./components/userClass/UserClassSummary";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import spanishMessages from 'ra-language-spanish';
import {
  GlobalNotificationsCreate,
  GlobalNotificationsEdit,
  GlobalNotificationsList
} from "./components/users/GlobalNotification";

/*import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
});*/


const messages = {
  es: spanishMessages,
  en: englishMessages,
};

const dataProvider = jsonServerProvider(servicePrefix);
const i18nProvider = polyglotI18nProvider((locale) => messages[locale], "en", {
  allowMissing: true,
  onMissingKey: (key, _, __) => key
});

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}
         authProvider={authProvider} i18nProvider={i18nProvider}>
    {permissions => [
      <Resource name="users" list={UserList}
                edit={permissions === 'admin' ? UserEdit : null}
                icon={UserIcon}/>,
      <Resource options={{label: 'User Plans'}} name="userplans"
                list={UserPlanList} icon={Autorenew}/>,
      <Resource name="userRewards" list={UserRewardList}
                edit={permissions === 'admin' ? UserRewardEdit : null}
                icon={UserIcon}/>,
      <Resource name="plans" list={PlansList}
                edit={permissions === 'admin' ? PlansEdit : null}
                icon={AttachMoney}/>,
      <Resource name="levels" list={LevelsList} icon={TrendingUp}
                edit={permissions === 'admin' ? LevelEdit : null}
                create={permissions === 'admin' ? LevelCreate : null}/>,
      <Resource name="globalnotifications" list={GlobalNotificationsList}
                icon={Message}
                edit={permissions === 'admin' ? GlobalNotificationsEdit : null}
                create={permissions === 'admin' ? GlobalNotificationsCreate : null}/>,
      <Resource name="promos" list={PromoList}
                edit={permissions === 'admin' ? PromoEdit : null} icon={Redeem}
                create={permissions === 'admin' ? PromoCreate : null}/>,
      <Resource name="studios" options={{label: 'Partners'}} list={StudioList}
                icon={Business} edit={StudioEdit}
                create={StudioCreate}/>,
      <Resource name="classes" options={{label: 'Schedules'}} list={ClassesList}
                icon={Schedule} edit={ClassesEdit}
                create={ClassesCreate}/>,
      <Resource name="categories" list={CategoryList} edit={CategoryEdit}
                create={CategoryCreate}/>,
      <Resource options={{label: 'Saas Category'}} name="saas-categories"
                list={SaasCategoryList}
                edit={SaasCategoryEdit} create={SaasCategoryCreate}/>,
      <Resource name="services" list={ServiceList} edit={ServiceEdit}
                create={ServiceCreate}/>,
      <Resource name="equipment" list={EquipmentList} edit={EquipmentEdit}
                create={EquipmentCreate}/>,
      <Resource name="countries" icon={Flag} list={CountryList}
                edit={CountryEdit} create={CountryCreate}/>,
      <Resource name="cities" icon={AddLocation} list={CityList} edit={CityEdit}
                create={CityCreate}/>,
      <Resource name="districts" icon={AddLocation} list={DistrictList}
                edit={DistrictEdit} create={DistrictCreate}/>,
      permissions === 'admin' ?
        <Resource options={{label: 'All User Classes'}} name="userclasses"
                  list={UserClassList} create={UserClassCreate} icon={CheckBox}/> :
        <Resource options={{label: 'All User Classes'}} name="userclasses"
                  list={UserClassListNoDelete} icon={CheckBox}/>,
      <Resource options={{label: 'User Class Summary'}}
                name="userclassessummary" list={UserClassSummary}
                icon={BarChartTwoTone}/>,
      <Resource options={{label: 'User Classes by Studio'}}
                name="userclassesbystudio" list={UserClassStudioList}
                icon={AccountBalance}/>,
      permissions === 'admin' &&
      <Resource name="billing" icon={MonetizationOn} edit={BillEdit}
                list={BillingList}/>,
      <Resource options={{label: 'Video Categories'}} icon={VideoLibrary}
                name="videocategories"
                list={VideoCategoryList} edit={VideoCategoryEdit}
                create={VideoCategoryCreate}/>,
      <Resource name="videos" icon={VideoLibrary} list={VideoList}
                edit={VideoEdit} create={VideoCreate}/>,
      <Resource options={{label: 'Video Views'}} name="userVideos"
                icon={PlayCircleFilled} list={UserVideoList}/>,
      <Resource options={{label: "Gift Cards"}} name="bbva" icon={CardGiftcard}
                list={BbvaList}/>,
      <Resource options={{label: "Pacifico"}} name="pacifico" icon={Lock}
                list={PacificoList}/>,
      <Resource name="programs" icon={CreateNewFolderIcon} list={ProgramList}
                edit={ProgramEdit}
                create={ProgramCreate}/>,
      <Resource options={{label: 'User Programs'}} name="user-programs"
                list={UserProgramList}/>,
      <Resource name="studioslist"/>,
    ]}
  </Admin>
);

export default App;
