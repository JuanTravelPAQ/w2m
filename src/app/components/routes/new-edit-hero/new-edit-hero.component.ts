import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/services/models/heroes.model';
import { HeroesService } from 'src/app/services/modules/heroes/heroes.service';
@Component({
  selector: 'app-new-edit-hero',
  templateUrl: './new-edit-hero.component.html',
  styleUrls: ['./new-edit-hero.component.css'],
})
export class NewEditHeroComponent {
  hero: Hero = {
    id: 0,
    name: '',
    fullName: '',
    gender: 'Male',
    occupation: '',
    action: '',
  };
  miForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    fullName: [''],
    gender: ['male', [Validators.required]],
    occupation: [''],
  });
  id: number | null;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private router: Router
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id')) ?? null;
    this.getHero();
  }

  save() {
    if (typeof this.id !== 'number') return;
    if (this.id == 0)
      this._heroesService.newHero(this.miForm.value).subscribe({
        next: (response: Hero) => {
          console.log(response);
        },
        error(err) {
          console.error(err);
        },
      });
    if (this.id > 0)
      this._heroesService
        .updateHero({
          ...{ ...this.miForm.value, id: this.hero.id, action: '' },
        })
        .subscribe({
          next: (response: Hero) => {
            console.log(response);
          },
          error(err) {
            console.error(err);
          },
        });
    this.router.navigate(['home']);
  }

  private getHero() {
    if (!this.id) return;
    this._heroesService.getHero(this.id).subscribe({
      next: (responseHero: Hero) => {
        this.hero = responseHero;
        this.miForm.controls['name'].patchValue(responseHero.name || null);
        this.miForm.controls['fullName'].patchValue(
          responseHero.fullName || null
        );
        this.miForm.controls['gender'].patchValue(responseHero.gender || null);
        this.miForm.controls['occupation'].patchValue(
          responseHero.occupation || null
        );
      },
      error(err) {
        console.error(err);
      },
    });
  }
}
