export const COMPANY_ROUTES = {
  DASHBOARD: '/company/dashboard',

  EMPLOYEES: '/company/employees',
  EMPLOYEE_CREATE: '/company/employee/create',
  EMPLOYEE_REQUEST: '/company/employee/request',
  EMPLOYEE_DETAILS: '/company/employee/details',

  ACHIEVEMENT: '/company/achievement',
  ACHIEVEMENT_CREATE: '/company/achievement/create',

  ADVANCE: '/company/advance',
  ADVANCE_REQUEST: '/company/advance-request',
  DEDUCTION_REQUEST: '/company/deduction-request',

  FINANCIAL: '/company/financial',
  REPAYMENT_CONFIGURATION: '/company/repayment-configuration',
  SALARIES_PAYMENTS: '/company/salaries-payments',
  ADD_SALARIES: '/company/add-salaries',
  SET_LIMITS: '/company/set-limits',
  SETTING: '/company/setting',

  USER_ROLE_MANAGEMENT_ROLE: '/company/user-role-management/role',
  USER_ROLE_MANAGEMENT_USER: '/company/user-role-management/user',
};

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',

  USER_MANAGEMENT_LIST: '/admin/users-list',
  USER_DETAILS: '/admin/user-details/:id',

  ORDERS_MANAGEMENT_LIST: '/admin/orders/list',
  ORDER_DETAILS: '/admin/orders/detail/:id',

  ROLES_MANAGEMENT_LIST: '/admin/master-table/roles-list',
  CATEGORIES_MANAGEMENT_LIST: '/admin/master-table/categories-list',
  BRANDS_MANAGEMENT_LIST: '/admin/master-table/brands-list',

  PRODUCTS_LIST: '/admin/products/list',
  PRODUCT_ADD: '/admin/product/create',
  PRODUCT_DETAILS: '/admin/product/detail',
  PRODUCT_VARIANT_DETAILS: '/admin/product/variant/detail',

  SETTING: '/admin/setting',
};
