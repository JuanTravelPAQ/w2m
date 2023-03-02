import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-edit-hero',
  templateUrl: './new-edit-hero.component.html',
  styleUrls: ['./new-edit-hero.component.css'],
})
export class NewEditHeroComponent {
  miForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    fullName: [''],
    gender: ['male', [Validators.required]],
    occupation: [''],
  });

  constructor(private fb: FormBuilder) {}

  save() {}
}
