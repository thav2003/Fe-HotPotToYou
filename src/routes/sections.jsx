import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import IngredientPage from 'src/pages/ingredient';
import DashboardLayout from 'src/layouts/dashboard';
import ProductTypesPage from 'src/pages/product-types';
import AxiosInterceptor from 'src/api/axiosInterceptor';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const UtensilPage = lazy(() => import('src/pages/utensil'));
export const UtensilCreatePage = lazy(() => import('src/sections/utensil/create'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '',
      element: <AxiosInterceptor />,
      children: [
        {
          element: (
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ),
          children: [
            { element: <IndexPage />, index: true },
            { path: 'user', element: <UserPage /> },
            { path: 'utensil', element: <UtensilPage /> },
            { path: 'products', element: <ProductsPage /> },
            { path: 'product-types', element: <ProductTypesPage /> },
            { path: 'ingredient', element: <IngredientPage /> },
            { path: 'blog', element: <BlogPage /> },
          ],
        },
        {
          path: 'utensil',
          children: [{ path: 'create', element: <UtensilCreatePage /> }],
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: '404',
          element: <Page404 />,
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ]);

  return routes;
}
