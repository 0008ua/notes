import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotePageRoutingModule } from './note-routing.module';

import { NotePage } from './note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NotePageRoutingModule,
  ],
  declarations: [NotePage]
})
export class NotePageModule {}
