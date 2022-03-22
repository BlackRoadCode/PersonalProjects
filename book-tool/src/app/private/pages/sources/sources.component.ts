import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Source, SourceType } from '../../interfaces/sources.interface';
import { SourcesService } from '../../services/sources.service';
import { SourcesHelperService } from '../../helpers/sources-helper.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css']
})
export class SourcesComponent implements OnInit {

  public user: User;
  public itsOrganization = false;
  public itsUnknowAuthor = false;
  public bookUrl = true;
  public bookDoi = false;
  public addAuthor = false;
  public sources: Source[] = [];

  bookSourceForm: FormGroup;

  scientificMagazineSourceForm: FormGroup;
  reportSourceForm: FormGroup;
  pictureSourceForm: FormGroup;

  public webPageSource = false;
  public bookSource = false;


  public reportSource = false;
  public scientificMagazineSource = false;
  public pictureSource = false;

  constructor(
    private _authService: AuthService,
    private _sourcesService: SourcesService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _sourcesHelperService:SourcesHelperService
  ){ }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      this.user = user;
      this.getSources(this.user);
    });
  }

  // get authorsBook(): FormArray {
  //   return this.bookSourceForm.get('authors') as FormArray;
  // }

  // addAuthorBook() {
  //   this.authorsBook.push(this._formBuilder.group(
  //     {
  //       authorInitials: [''],
  //       authorLastName: ['']
  //     }
  //   ));
  // }

  createForm( typeForm: SourceType ) {

    const urlValid = '^((http|https):\/\/)([a-z]+\.)[a-z0-9-]+(\.[a-z]{1,4}){1,2}(/.*\?.*)?$';

    switch (typeForm) {
      case 'webpage':
        // this.webPageSourceForm = this._formBuilder.group({
        //   webPageTitle: ['', Validators.required],
        //   authors: this._formBuilder.array([]),
        //   webPageUrl: ['', [Validators.minLength(5), Validators.pattern(urlValid)]],
        //   itsUnknowAuthor: [''],
        //   organization: [''],

        //   publishDateDay: ['', [Validators.min(1), Validators.max(31)]],
        //   publishDateMonth: ['', [Validators.min(1), Validators.max(12)]],
        //   publishDateYear: ['', [Validators.required, Validators.min(1000), Validators.max(3000)]],

        //   consultDateDay: ['', [Validators.min(1), Validators.max(31)]],
        //   consultDateMonth: ['', [Validators.min(1), Validators.max(12)]],
        //   consultDateYear: ['', [Validators.required, Validators.min(1000), Validators.max(3000)]],

        //   websiteName: ['']
        // });

        break;

      case 'book':

        // this.bookSourceForm = this._formBuilder.group({
        //   bookTitle: [''],
        //   authors: this._formBuilder.array([]),
        //   itsUnknowAuthor: [''],
        //   organization: [''],
        //   editorialName: [''],
        //   publishDateYear: [''],
        //   bookSourceDoi: [''],
        //   bookSourceUrl: ['']
        // });

        break;

      case 'report':
        console.log('un caso distinto a webpage');

        break;
      case 'scientificMagazine':
        console.log('un caso distinto a webpage');

        break;
      case 'image':
        console.log('un caso distinto a webpage');

        break;

      default:
        break;
    }

  }

  saveSource( form: FormGroup, type: SourceType ) {

    if (form.valid) {
      
      const data = this._sourcesHelperService.setData(type, form);

      this._sourcesService.createSource(data, this.user).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Registro guardado',
          text: 'La fuente ha sido guardada exitosamente'
        });

        form.reset();
        this.activateAddSource('noneClass');
        this._router.navigate(['private', 'dashboard', 'sources']);
      }).catch(error => {
        Swal.fire({
          title: 'Error al guardar el registro',
          icon: 'error',
          text: 'Hubo un error al guardar el registro'
        });
      });

    }

  }

  getSources( user: User ) {
    this._sourcesService.getSources(this.user.uid).subscribe(res => {
      this.sources = res;
    });
  }

  activateAddSource(source: string) {
    switch (source) {
      case 'webPageSource':

        // this.createForm('webpage');
        // Ejecutar este método junto con la creación del form
        // this.addAuthorWebPage();

        this.webPageSource = true;
        this.bookSource = false;
        this.scientificMagazineSource = false;
        this.reportSource = false;
        this.pictureSource = false;

        break;

      case 'bookSource':

        // this.createForm('book');
        // this.addAuthorBook();

        this.webPageSource = false;
        this.bookSource = true;
        this.scientificMagazineSource = false;
        this.reportSource = false;
        this.pictureSource = false;
        break;

      case 'scientificMagazineSource':

        this.createForm('scientificMagazine');
        // this.addAuthor();

        this.webPageSource = false;
        this.bookSource = false;
        this.scientificMagazineSource = true;
        this.reportSource = false;
        this.pictureSource = false;
        break;

      case 'reportSource':

        this.createForm('report');
        // this.addAuthor();

        this.webPageSource = false;
        this.bookSource = false;
        this.scientificMagazineSource = false;
        this.reportSource = true;
        this.pictureSource = false;
        break;

      case 'pictureSource':

        this.createForm('image');
        // this.addAuthor();

        this.webPageSource = false;
        this.bookSource = false;
        this.scientificMagazineSource = false;
        this.reportSource = false;
        this.pictureSource = true;
        break;

      default:
        this.webPageSource = false;
        this.bookSource = false;
        this.scientificMagazineSource = false;
        this.reportSource = false;
        this.pictureSource = false;
        break;
    }
  }

  activateAddSourceMobile(value: string) {
    switch (value) {
      case 'webPageSource':
        this.webPageSource = true;
        this.scientificMagazineSource = false;
        this.bookSource = false;
        this.reportSource = false;
        this.pictureSource = false;
        break;
      case 'bookSource':
        this.webPageSource = false;
        this.bookSource = true;
        this.scientificMagazineSource = false;
        this.reportSource = false;
        this.pictureSource = false;
        break;
      case 'scientificMagazineSource':
        this.webPageSource = false;
        this.bookSource = false;
        this.scientificMagazineSource = true;
        this.reportSource = false;
        this.pictureSource = false;
        break;
      case 'reportSource':
        this.webPageSource = false;
        this.bookSource = false;
        this.scientificMagazineSource = false;
        this.reportSource = true;
        this.pictureSource = false;
        break;
      case 'pictureSource':
        this.webPageSource = false;
        this.bookSource = false;
        this.scientificMagazineSource = false;
        this.reportSource = false;
        this.pictureSource = true;
        break;

      default:
        this.webPageSource = false;
        this.bookSource = false;
        this.scientificMagazineSource = false;
        this.reportSource = false;
        this.pictureSource = false;
        break;
    }
  }

  editSource(){
    console.log('edit source');
    
  }

  deleteSource(){
    console.log('delete source');
    
  }

}
