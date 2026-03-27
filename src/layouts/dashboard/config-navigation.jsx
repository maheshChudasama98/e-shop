import { ADMIN_ROUTES, COMPANY_ROUTES } from 'src/routes/routes';

import SvgColor from 'src/components/svg-color';
import { defaultImageUrl } from 'src/utils/utils';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={defaultImageUrl(`/assets/icons/navbar/${name}.svg`)}
    sx={{ width: '20px', height: '20px' }}
  />
);

export const adminNavConfig = [
  {
    title: 'Dashboard',
    path: ADMIN_ROUTES.DASHBOARD,
    icon: icon('dashboard'),
  },
  {
    title: 'Users',
    path: ADMIN_ROUTES.USER_MANAGEMENT_LIST,
    icon: icon('employees'),
  },
  {
    title: 'Master Tables',
    path: ADMIN_ROUTES.ROLES_MANAGEMENT_LIST,
    icon: icon('employees'),
    child: [
      {
        title: 'Roles',
        path: ADMIN_ROUTES.ROLES_MANAGEMENT_LIST,
        display: true,
      },
      {
        title: 'Brands',
        path: ADMIN_ROUTES.BRANDS_MANAGEMENT_LIST,
        display: true,
      },
      {
        title: 'Categories',
        path: ADMIN_ROUTES.CATEGORIES_MANAGEMENT_LIST,
        display: true,
      },
    ],
  },
  {
    title: 'Products',
    path: ADMIN_ROUTES.PRODUCTS_LIST,
    icon: icon('employees'),
    child: [
      {
        title: 'Product Add',
        path: ADMIN_ROUTES.PRODUCT_ADD,
      },
      {
        title: 'Product Edit',
        path: ADMIN_ROUTES.PRODUCT_DETAILS,
      },
      {
        title: 'Products',
        path: ADMIN_ROUTES.PRODUCTS_LIST,
        display: true,
      },

      {
        title: 'Product Edit',
        path: ADMIN_ROUTES.PRODUCT_VARIANT_DETAILS,
      },
    ],
  },
  {
    title: 'Setting',
    path: ADMIN_ROUTES.SETTING,
    icon: icon('setting'),
  },
];

export const companyNavConfig = [
  {
    title: 'Dashboard',
    path: COMPANY_ROUTES.DASHBOARD,
    icon: icon('dashboard'),
  },
  {
    title: 'Employees',
    path: COMPANY_ROUTES.EMPLOYEES,
    icon: icon('employees'),
    child: [
      {
        title: 'Add Employees',
        path: COMPANY_ROUTES.EMPLOYEE_CREATE,
      },
      {
        title: 'Employees Request',
        path: COMPANY_ROUTES.EMPLOYEE_REQUEST,
      },
      {
        title: 'Employees Details',
        path: COMPANY_ROUTES.EMPLOYEE_DETAILS,
      },
    ],
  },
  {
    title: 'Salaries & Payments',
    path: COMPANY_ROUTES.SALARIES_PAYMENTS,
    icon: icon('salaries_payments'),
  },
  {
    title: 'Advance',
    path: COMPANY_ROUTES.ADVANCE_REQUEST,
    icon: icon('advance'),
    child: [
      {
        title: 'Advance request',
        path: COMPANY_ROUTES.ADVANCE_REQUEST,
        display: true,
      },
      {
        title: 'Advance',
        path: COMPANY_ROUTES.ADVANCE,
        display: true,
      },
      {
        title: 'Deduction request',
        path: COMPANY_ROUTES.DEDUCTION_REQUEST,
        display: true,
      },
    ],
  },
  {
    title: 'Financial',
    path: COMPANY_ROUTES.FINANCIAL,
    icon: icon('financial'),
  },
  {
    title: 'User Role Management',
    path: COMPANY_ROUTES.USER_ROLE_MANAGEMENT_ROLE,
    icon: icon('user_role_management'),
    child: [
      {
        title: 'Role',
        path: COMPANY_ROUTES.USER_ROLE_MANAGEMENT_ROLE,
        display: true,
      },
      {
        title: 'User',
        path: COMPANY_ROUTES.USER_ROLE_MANAGEMENT_USER,
        display: true,
      },
    ],
  },
  {
    title: 'Achievement',
    path: COMPANY_ROUTES.ACHIEVEMENT,
    icon: icon('achievement'),
    child: [
      {
        title: 'Add Achievement',
        path: COMPANY_ROUTES.ACHIEVEMENT_CREATE,
      },
    ],
  },
  {
    title: 'Set Limits',
    path: COMPANY_ROUTES.SET_LIMITS,
    icon: icon('set_limits'),
  },
  {
    title: 'Repayment Configuration',
    path: COMPANY_ROUTES.REPAYMENT_CONFIGURATION,
    icon: icon('repayment_configuration'),
  },
  {
    title: 'Setting',
    path: COMPANY_ROUTES.SETTING,
    icon: icon('setting'),
  },
];
