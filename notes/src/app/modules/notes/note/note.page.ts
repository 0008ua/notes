import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  notesForm!: FormGroup;
  notesData = [
    {
      text: 'Note1',
      checked: false,
    },
    {
      text: 'Note2',
      checked: true,
    },
    {
      text: 'Note3',
      checked: true,
    },
  ];

  ngOnInit() {
    this.notesForm = this.formBuilder.group({
      notes: this.formBuilder.array(this.notesData.map((note) => this.createNote(note))),
    });
  }

  get notes(): FormArray {
    return this.notesForm?.get('notes') as FormArray;
  }

  createNote(obj: { text: string; checked: boolean }) {
    const formGroup = this.formBuilder.group({
      text: [obj.text],
      checked: [obj.checked],
    });
    return formGroup;
  }

  onRemoveNote(position: number): void {
    this.notes.removeAt(position);
  }

  onAddNote(): void {
    this.notes.push(this.createNote({ text: '', checked: false }));
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.notes.patchValue(ev.detail.complete(this.notes.controls));
  }

  onSaveAndReturn():void {
    console.log('value', this.notes.value)
    this.router.navigate((['/notes/notes-list']));
  }
}
