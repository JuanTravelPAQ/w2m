import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NewEditHeroComponent } from './new-edit-hero/new-edit-hero.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [HomeComponent, NewEditHeroComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  exports: [HomeComponent, NewEditHeroComponent],
})
export class RoutesModule {}
