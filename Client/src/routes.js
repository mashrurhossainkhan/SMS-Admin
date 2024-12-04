import React from 'react';

const Toaster = React.lazy(() =>
  import('./views/notifications/toaster/Toaster')
);
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() =>
  import('./views/base/breadcrumbs/Breadcrumbs')
);
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() =>
  import('./views/base/jumbotrons/Jumbotrons')
);
const ListGroups = React.lazy(() =>
  import('./views/base/list-groups/ListGroups')
);
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() =>
  import('./views/base/paginations/Pagnations')
);
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() =>
  import('./views/base/progress-bar/ProgressBar')
);
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() =>
  import('./views/buttons/brand-buttons/BrandButtons')
);
const ButtonDropdowns = React.lazy(() =>
  import('./views/buttons/button-dropdowns/ButtonDropdowns')
);
const ButtonGroups = React.lazy(() =>
  import('./views/buttons/button-groups/ButtonGroups')
);
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() =>
  import('./views/icons/coreui-icons/CoreUIIcons')
);
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() =>
  import('./views/theme/typography/Typography')
);
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const AddGroup = React.lazy(() => import('./views/User Group/add_group'));
const ManageGroupUser = React.lazy(() =>
  import('./views/User Group/manage_user')
);

const AddUser = React.lazy(() => import('./views/user/Add_user'));
const ManageUser = React.lazy(() => import('./views/user/Manage_user'));
const ManageLedger = React.lazy(() => import('./views/user/Manageledger'));

const Customer = React.lazy(() => import('./views/Customer/Customer'));

const Brand = React.lazy(() => import('./views/brand/brand'));

const Category = React.lazy(() => import('./views/category/Category'));

const ManageSupplier = React.lazy(() =>
  import('./views/supplier/Manage_supplier')
);

const Import = React.lazy(() => import('./views/Import/Import'));
const Warehouse = React.lazy(() => import('./views/Warehouse/Warehouse'));
const Shelf = React.lazy(() => import('./views/Shelf/Shelf'));
const ManageBillingOrder = React.lazy(() =>
  import('./views/Billing/Manage_Order')
);
const Attribute = React.lazy(() => import('./views/Attributes/Attribute'));
const AddStockProduct = React.lazy(() =>
  import('./views/Stock Manager/Add_Product')
);
const ManageStockProduct = React.lazy(() =>
  import('./views/Stock Manager/Manage_Product')
);

const AddOrder = React.lazy(() => import('./views/order/Add_Order'));
const Draft = React.lazy(() => import('./views/order/Draft'));
const ManageOrder = React.lazy(() => import('./views/order/Manage_Order'));

const CRM = React.lazy(() => import('./views/CRM/Crm'));

const Attendance = React.lazy(() => import('./views/Attendance/Attendance'));

const Results = React.lazy(() => import('./views/report/result'));
const StockReport = React.lazy(() => import('./views/report/stock_report'));
const ImportReport = React.lazy(() => import('./views/report/import_report'));
const DueReport = React.lazy(() => import('./views/report/due_report'));
const DepositReport = React.lazy(() => import('./views/report/deposit_report'));

const Company = React.lazy(() => import('./views/Company/Company'));

const CompanyProfile = React.lazy(() =>
  import('./views/company_profile/company_profile')
);
const Setting = React.lazy(() => import('./views/Setting/Setting'));

const Login = React.lazy(() => import('./views/pages/login/Login'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  {
    path: '/buttons/button-dropdowns',
    name: 'Dropdowns',
    component: ButtonDropdowns,
  },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    component: ButtonGroups,
  },
  {
    path: '/buttons/brand-buttons',
    name: 'Brand Buttons',
    component: BrandButtons,
  },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Alerts,
    exact: true,
  },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  // Login
  {
    path: '/login',
    exact: true,
    name: 'Login',
    component: Login,
  },
  // User
  {
    path: '/user',
    exact: true,
    name: 'User',
    component: ManageUser,
  },
  {
    path: '/user/add_user',
    name: 'Add User',
    component: AddUser,
  },
  {
    path: '/user/manage_user',
    name: 'Manage User',
    component: ManageUser,
  },
  {
    path: '/user/manage_ledger',
    name: 'Manage Ledger',
    component: ManageLedger,
  },
  // user Group
  {
    path: '/user_group',
    exact: true,
    name: 'User Group',
    component: ManageGroupUser,
  },
  {
    path: '/user_group/add_group',
    name: 'Add Group',
    component: AddGroup,
  },
  {
    path: '/user_group/manage_group_user',
    name: 'Manage Group User',
    component: ManageGroupUser,
  },

  // Brand
  {
    path: '/brand',
    exact: true,
    name: 'Brand',
    component: Brand,
  },

  // Category
  {
    path: '/category',
    exact: true,
    name: 'Category',
    component: Category,
  },

  // customer
  {
    path: '/customer',
    exact: true,
    name: 'Customer',
    component: Customer,
  },
  // supplier
  {
    path: '/manage_supplier',
    exact: true,
    name: 'supplier',
    component: ManageSupplier,
  },
  // Import
  {
    path: '/import',
    exact: true,
    name: 'Import',
    component: Import,
  },
  // Warehouse
  {
    path: '/warehouse',
    exact: true,
    name: 'Warehouse',
    component: Warehouse,
  },
  // Shelf
  {
    path: '/Shelf',
    exact: true,
    name: 'Shelf',
    component: Shelf,
  },
  // Billing
  {
    path: '/billing',
    exact: true,
    name: 'Billing',
    component: ManageBillingOrder,
  },
  {
    path: '/billing/manage_order',
    name: 'Manage Order',
    component: ManageBillingOrder,
  },
  // Attribute
  {
    path: '/attributes',
    exact: true,
    name: 'Attribute',
    component: Attribute,
  },
  // Stock Manager
  {
    path: '/stock_manager',
    exact: true,
    name: 'Stock Manager',
    component: ManageStockProduct,
  },
  {
    path: '/stock_manager/add_product',
    name: 'Add Product',
    component: AddStockProduct,
  },
  {
    path: '/stock_manager/manage_product',
    name: 'Manage Product',
    component: ManageStockProduct,
  },

  // Order
  {
    path: '/order',
    exact: true,
    name: 'Order',
    component: ManageStockProduct,
  },
  {
    path: '/order/add_order',
    name: 'Add Product',
    component: AddOrder,
  },
  {
    path: '/order/draft',
    name: 'Manage Product',
    component: Draft,
  },
  {
    path: '/order/manage_order',
    name: 'Manage Product',
    component: ManageOrder,
  },
  // CRM
  {
    path: '/crm',
    exact: true,
    name: 'CRM',
    component: CRM,
  },
  // Attendance
  {
    path: '/attendance',
    exact: true,
    name: 'Attendance',
    component: Attendance,
  },

  // report
  {
    path: '/report',
    exact: true,
    name: 'report',
    component: Results,
  },
  {
    path: '/report/sales_report',
    name: 'Sales Report',
    component: Results,
  },
  {
    path: '/report/stock_report',
    name: 'Stock Report',
    component: StockReport,
  },
  {
    path: '/report/import_report',
    name: 'Import Report',
    component: ImportReport,
  },
  {
    path: '/report/due_report',
    name: 'Due Report',
    component: DueReport,
  },
  {
    path: '/report/deposit_report',
    name: 'Deposit Report',
    component: DepositReport,
  },

  // Company
  {
    path: '/company',
    exact: true,
    name: 'Company',
    component: Company,
  },
  // CompanyProfile
  {
    path: '/company_profile',
    exact: true,
    name: 'Company Profile',
    component: CompanyProfile,
  },
  // Setting
  {
    path: '/setting',
    exact: true,
    name: 'Setting',
    component: Setting,
  },
];

export default routes;
