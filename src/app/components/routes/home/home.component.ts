import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Hero } from 'src/app/services/models/heroes.model';
import { MatDialog } from '@angular/material/dialog';
import { HeroesService } from 'src/app/services/modules/heroes/heroes.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns: string[] = [
    'id',
    'name',
    'fullName',
    'gender',
    'occupation',
    'action',
  ];
  dataSource: Hero[] = [];
  dataSourceFilter: Hero[] = [];

  searchName: string = '';
  searchId: string = '';

  constructor(
    private _heroesService: HeroesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllHeroes();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    hero: Hero
  ): void {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    let instance = dialogRef.componentInstance;
    instance.modelText = {
      title: `Delete hero "${hero.name}"?`,
      description: 'This option has no way back.',
      buttonAccept: 'Delete',
      buttonCancel: 'Cancel',
    };
    instance.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.delete(20);
    });
  }

  private delete(id: number) {
    this._heroesService.delete(id).subscribe({
      next: (response: Hero) => {
        console.log(response);
      },
      error(err) {
        console.error(err);
      },
    });
  }

  private getAllHeroes() {
    this._heroesService.getAllHeroes().subscribe({
      next: (response: Hero[]) => {
        this.dataSource = response;
        this.dataSourceFilter = this.dataSource;
      },
      error(err) {
        console.error(err);
      },
    });
  }

  search(value: string, type: string) {
    this.dataSourceFilter = [];
    if (type === 'id') {
      this.dataSource.forEach((item) => {
        if (item.id.toString() === value) this.dataSourceFilter.push(item);
      });
    } else {
      this.dataSource.find((item) => {
        if (item.name.toLowerCase().includes(value.toLowerCase()))
          this.dataSourceFilter.push(item);
      });
    }
    if (!value) this.dataSourceFilter = this.dataSource;
    this.pageIndex = 0;
  }

  getPaginatedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.dataSourceFilter.slice(start, end);
  }

  goToPage(event: any) {
    this.pageIndex = event.pageIndex;
    return this.getPaginatedData();
  }
}
