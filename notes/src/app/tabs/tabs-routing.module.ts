import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'notes',
        loadChildren: () =>
          import('../modules/notes/notes.module').then((m) => m.NotesPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../modules/settings/settings.module').then((m) => m.SettingsPageModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../modules/auth/auth.module').then((m) => m.AuthPageModule),
      },
      {
        path: '',
        redirectTo: '/notes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
