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
                 loadComponent: () => import('./features/dashboard/pages/directivas-page/directivas-page'),
            },
             {
                path:'comunicacion',
                 loadComponent: () => import('./features/dashboard/pages/comunicacion-page/comunicacion-page'),
            },
               {
                path:'formularios',
                 loadComponent: () => import('./features/dashboard/pages/formularios-page/formularios-page'),
            },
               {
                path:'servicios',
                 loadComponent: () => import('./features/dashboard/pages/servicios-page/servicios-page'),
            },
               {
                path:'modulos',
                 loadComponent: () => import('./features/dashboard/pages/modulos-page/modulos-page'),
            },
               {
                path:'hostlistener-hostbinding',
                 loadComponent: () => import('./features/dashboard/pages/hostlistener-hostbinding-page/hostlistener-hostbinding-page'),
            },
             {
                path:'peticiones-HTTP',
                 loadComponent: () => import('./features/dashboard/pages/peticiones-http-page/peticiones-http-page'),
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
