import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Heroes } from 'src/app/services/models/heroes.model';
import { MatDialog } from '@angular/material/dialog';
import { HeroesService } from 'src/app/services/modules/heroes/heroes.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = true;

  pageEvent: PageEvent | undefined;

  displayedColumns: string[] = [
    'id',
    'name',
    'fullName',
    'gender',
    'occupation',
    'action',
  ];
  dataSource: TableHeroes[] = [];

  value = '';

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
    id: number
  ): void {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    let instance = dialogRef.componentInstance;
    instance.modelText = {
      title: 'Delete hero?',
      description: 'This option has no way back.',
      buttonAccept: 'Delete',
      buttonCancel: 'Cancel',
    };
    instance.dialogRef.afterClosed().subscribe((result) => {
      instance.handleSubmit;
      console.log(instance);
    });
  }

  private getAllHeroes() {
    this._heroesService.getAllHeroes().subscribe({
      next: (response: Heroes[]) => {
        this.dataSource = response.map((item: Heroes) => ({
          id: item.id,
          name: item.name,
          fullName: item.biography.fullName,
          gender: item.appearance.gender,
          occupation: item.work.occupation,
          action: '',
        }));
        this.length = response.length;
        console.log(response);
        this.dataSource = this.dataSource.slice(0, 10);
      },
      error(err) {
        console.error(err);
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}

export interface TableHeroes {
  id: number;
  name: string;
  fullName: string;
  gender: string;
  occupation: string;
  action: string;
}
