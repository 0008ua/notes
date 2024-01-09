import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesListPageRoutingModule } from './notes-list-routing.module';

import { NotesListPage } from './notes-list.page';
import { NotesListItemComponent } from './notes-list-item/notes-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesListPageRoutingModule
  ],
  declarations: [NotesListPage, NotesListItemComponent]
})
export class NotesListPageModule {}
