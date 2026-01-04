import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page'),
        children:[
            {
                path:'data-binding', 
                 loadComponent: () => import('./features/dashboard/pages/data-binding-page/data-binding-page'),
            },
             {
                path:'directivas',
                 loadComponent: () => import('./features/dashboard/pages/data-binding-page/data-binding-page'),
            },
             {
                path:'comunicacion',
                 loadComponent: () => import('./features/dashboard/pages/data-binding-page/data-binding-page'),
            },
               {
                path:'formularios',
                 loadComponent: () => import('./features/dashboard/pages/data-binding-page/data-binding-page'),
            },
               {
                path:'servicios',
                 loadComponent: () => import('./features/dashboard/pages/data-binding-page/data-binding-page'),
            },
               {
                path:'modulos',
                 loadComponent: () => import('./features/dashboard/pages/data-binding-page/data-binding-page'),
            },
               {
                path:'hostlistener-hostbinding',
                 loadComponent: () => import('./features/dashboard/pages/data-binding-page/data-binding-page'),
            },
             {
                path:'peticiones-HTTP',
                 loadComponent: () => import('./features/dashboard/pages/data-binding-page/data-binding-page'),
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
