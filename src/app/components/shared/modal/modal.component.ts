import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modelText: TextModel = {
    buttonAccept: 'Accept',
    buttonCancel: 'Cancel',
    title: 'title',
    description: 'description',
  };

  @Output() onSubmit = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  ngOnInit(): void {}

  handleSubmit(value: boolean) {
    value ? this.onSubmit.emit(value) : this.dialogRef.close();
  }
}

type TextModel = {
  title: string;
  description: string;
  buttonAccept: string;
  buttonCancel: string;
};
