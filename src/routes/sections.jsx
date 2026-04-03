import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { ADMIN_ROUTES } from 'src/routes/routes';

import DashboardLayout from 'src/layouts/dashboard';
import ProtectedRoute from 'src/components/ProtectedRoute';

export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LoginPage = lazy(() => import('src/pages/auth/login'));
export const ResetPasswordPage = lazy(() => import('src/pages/auth/reset.password'));
export const SignUpPage = lazy(() => import('src/pages/auth/sign.up'));

// export const RegistrationCompany = lazy(() => import('src/pages/auth/registration.company'));

// --------- Admin Routes Here ---------  //
export const AdminDashboardPage = lazy(() => import('src/pages/admin/dashboard'));

export const UserListPage = lazy(() => import('src/pages/admin/user-management'));
export const UserDetailPage = lazy(() => import('src/pages/admin/user-management/userDetail'));
export const RolesPage = lazy(() => import('src/pages/admin/master-tables/roles'));
export const CategoriesPage = lazy(() => import('src/pages/admin/master-tables/categories'));
export const BrandsPage = lazy(() => import('src/pages/admin/master-tables/brands'));
export const CertificatesPage = lazy(() => import('src/pages/admin/master-tables/certificates'));
export const ColorsPage = lazy(() => import('src/pages/admin/master-tables/colors'));
export const TabsPage = lazy(() => import('src/pages/admin/master-tables/tabs'));

export const ProductsPage = lazy(() => import('src/pages/admin/products'));
export const ProductAddPage = lazy(() => import('src/pages/admin/products/product.add'));
export const ProductDetailsPage = lazy(() => import('src/pages/admin/products/product.details'));

export const VariantPage = lazy(() => import('src/pages/admin/products/variant'));

export const OrdersPage = lazy(() => import('src/pages/admin/orders'));
export const OrderDetailPage = lazy(() => import('src/pages/admin/orders/OrderDetailPage'));

export default function Router() {
  const CommRoutes = [
    { path: 'login', element: <LoginPage />, index: true },
    { path: 'forgot-password', element: <ResetPasswordPage />, index: true },
    { path: 'sign-up', element: <SignUpPage />, index: true },
    { path: '*', element: <Page404 /> },
    { path: '', element: <Navigate to="login" replace /> },
  ];

  const GlobalRouters = [];

  const AdminRouters = [
    { path: ADMIN_ROUTES.DASHBOARD, element: <AdminDashboardPage />, title: 'Dashboard' },
    { path: ADMIN_ROUTES.USER_MANAGEMENT_LIST, element: <UserListPage />, title: 'user-management' },
    { path: ADMIN_ROUTES.USER_DETAILS, element: <UserDetailPage />, title: 'user-detail' },
    { path: ADMIN_ROUTES.ROLES_MANAGEMENT_LIST, element: <RolesPage />, title: 'roles-management' },
    { path: ADMIN_ROUTES.CATEGORIES_MANAGEMENT_LIST, element: <CategoriesPage />, title: 'categories-management' },
    { path: ADMIN_ROUTES.BRANDS_MANAGEMENT_LIST, element: <BrandsPage />, title: 'brands-management' },
    { path: ADMIN_ROUTES.CERTIFICATES_MANAGEMENT_LIST, element: <CertificatesPage />, title: 'certificates-management' },
    { path: ADMIN_ROUTES.COLOR_MANAGEMENT_LIST, element: <ColorsPage />, title: 'colors-management' },
    { path: ADMIN_ROUTES.TABS_MANAGEMENT_LIST, element: <TabsPage />, title: 'tabs-management' },

    // Products-Add
    { path: ADMIN_ROUTES.PRODUCTS_LIST, element: <ProductsPage />, title: 'Products' },
    { path: ADMIN_ROUTES.PRODUCT_ADD, element: <ProductAddPage />, title: 'Product Add' },
    { path: ADMIN_ROUTES.PRODUCT_DETAILS, element: <ProductDetailsPage />, title: 'Product Details' },
    { path: ADMIN_ROUTES.PRODUCT_VARIANT_DETAILS, element: <VariantPage />, title: 'Variant Details' },

    // Orders
    { path: ADMIN_ROUTES.ORDERS_MANAGEMENT_LIST, element: <OrdersPage />, title: 'Orders' },
    { path: ADMIN_ROUTES.ORDER_DETAILS, element: <OrderDetailPage />, title: 'Order Details' },
  ];

  const Routers = [];

  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [...Routers, ...GlobalRouters, ...AdminRouters],
    },
    ...CommRoutes,
  ]);
  return routes;
}
