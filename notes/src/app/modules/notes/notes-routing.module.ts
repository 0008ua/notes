import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesPage } from './notes.page';

const routes: Routes = [
  {
    path: '',
    component: NotesPage,
    children: [
      {
        path: 'notes-list',
        loadChildren: () =>
          import('./notes-list/notes-list.module').then((m) => m.NotesListPageModule),
      },
      {
        path: ':id',
        loadChildren: () =>
          import('./note/note.module').then((m) => m.NotePageModule),
      },

      // {
      //   path: 'notes-list',
      //   loadChildren: () =>
      //     import('./notes-list/notes-list.module').then((m) => m.NotesListModule),
      // },
      // {
      //   path: ':id',
      //   loadChildren: () =>
      //     import('./notes-item/notes-item.module').then((m) => m.NotesItemModule),
      // },
      {
        path: '',
        redirectTo: 'note34',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesPageRoutingModule {}
