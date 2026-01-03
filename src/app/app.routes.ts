import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page'),
        children:[
            {
                path:'data-binding',
                 loadComponent: () => import('./features/dashboard/components/data-binding.component/data-binding.component'),
            },
             {
                path:'directivas',
                 loadComponent: () => import('./features/dashboard/components/data-binding.component/data-binding.component'),
            },
             {
                path:'comunicacion',
                 loadComponent: () => import('./features/dashboard/components/data-binding.component/data-binding.component'),
            },
               {
                path:'formularios',
                 loadComponent: () => import('./features/dashboard/components/data-binding.component/data-binding.component'),
            },
               {
                path:'servicios',
                 loadComponent: () => import('./features/dashboard/components/data-binding.component/data-binding.component'),
            },
               {
                path:'modulos',
                 loadComponent: () => import('./features/dashboard/components/data-binding.component/data-binding.component'),
            },
               {
                path:'hostlistener-hostbinding',
                 loadComponent: () => import('./features/dashboard/components/data-binding.component/data-binding.component'),
            },
             {
                path:'peticiones-HTTP',
                 loadComponent: () => import('./features/dashboard/components/data-binding.component/data-binding.component'),
            },
                {
            path:'**',
             redirectTo:'data-binding'
          }

        ]
    },
    {
        path:'**',
        redirectTo:'dashboard'
    }
];
