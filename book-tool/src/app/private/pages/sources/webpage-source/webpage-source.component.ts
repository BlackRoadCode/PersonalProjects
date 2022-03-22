import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { SourcesHelperService } from 'src/app/private/helpers/sources-helper.service';
import { SourceType } from 'src/app/private/interfaces/sources.interface';
import { SourcesService } from 'src/app/private/services/sources.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-webpage-source',
  templateUrl: './webpage-source.component.html',
  styleUrls: ['./webpage-source.component.css']
})
export class WebpageSourceComponent implements OnInit {

  @Input() webPageSourceFlag = false;
  @Input() user:User;

  webPageSourceForm: FormGroup;
  
  constructor( private _formBuilder: FormBuilder,
              private _sourcesService: SourcesService,
              private _router: Router,
              private _sourcesHelperService:SourcesHelperService ) { 
    this.createForm();
    this.addAuthorWebPage();
  }
  
  ngOnInit(): void { }

  createForm(){
    const urlValid = '^((http|https):\/\/)([a-z]+\.)[a-z0-9-]+(\.[a-z]{1,4}){1,2}(/.*\?.*)?$';

    this.webPageSourceForm = this._formBuilder.group({
      webPageTitle: ['', Validators.required],
      authors: this._formBuilder.array([]),
      webPageUrl: ['', [Validators.minLength(5), Validators.pattern(urlValid)]],
      itsUnknowAuthor: [''],
      organization: [''],

      publishDateDay: ['', [Validators.min(1), Validators.max(31)]],
      publishDateMonth: ['', [Validators.min(1), Validators.max(12)]],
      publishDateYear: ['', [Validators.required, Validators.min(1000), Validators.max(3000)]],

      consultDateDay: ['', [Validators.min(1), Validators.max(31)]],
      consultDateMonth: ['', [Validators.min(1), Validators.max(12)]],
      consultDateYear: ['', [Validators.required, Validators.min(1000), Validators.max(3000)]],

      websiteName: ['']
    });
  }

  addAuthorWebPage() {
    this.authorsWebPage.push(this._formBuilder.group(
      {
        authorInitials: [''],
        authorLastName: ['']
      }
    ));
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
        // this.activateAddSource('noneClass');
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

  help(type:string){

    if( type === 'onlineArticle' ){
      Swal.fire({
        icon: 'info',
        title: 'Ayuda',
        text: 'Aquí el texto de ayuda de online article'
      });
    }

  }

  get authorsWebPage(): FormArray {
    return this.webPageSourceForm.get('authors') as FormArray;
  }

  get webPageTitleValid() {
    return this.webPageSourceForm.get('webPageTitle').valid && this.webPageSourceForm.get('webPageTitle').touched;
  }

  get webPageTitleInvalid() {
    return this.webPageSourceForm.get('webPageTitle').invalid && this.webPageSourceForm.get('webPageTitle').touched;
  }

  get webPageUrlValid() {
    return this.webPageSourceForm.get('webPageUrl').valid && this.webPageSourceForm.get('webPageUrl').touched;
  }

  get webPageUrlInvalid() {
    return this.webPageSourceForm.get('webPageUrl').invalid && this.webPageSourceForm.get('webPageUrl').touched;
  }

  get publishDateDayValid() {
    return this.webPageSourceForm.get('publishDateDay').valid && this.webPageSourceForm.get('publishDateDay').touched;
  }

  get publishDateDayInvalid() {
    return this.webPageSourceForm.get('publishDateDay').invalid && this.webPageSourceForm.get('publishDateDay').touched;
  }

  get publishDateMonthValid() {
    return this.webPageSourceForm.get('publishDateMonth').valid && this.webPageSourceForm.get('publishDateMonth').touched;
  }

  get publishDateMonthInvalid() {
    return this.webPageSourceForm.get('publishDateMonth').invalid && this.webPageSourceForm.get('publishDateMonth').touched;
  }

  get publishDateYearValid() {
    return this.webPageSourceForm.get('publishDateYear').valid && this.webPageSourceForm.get('publishDateYear').touched;
  }

  get publishDateYearInvalid() {
    return this.webPageSourceForm.get('publishDateYear').invalid && this.webPageSourceForm.get('publishDateYear').touched;
  }

  get consultDateDayValid() {
    return this.webPageSourceForm.get('consultDateDay').valid && this.webPageSourceForm.get('consultDateDay').touched;
  }

  get consultDateDayInvalid() {
    return this.webPageSourceForm.get('consultDateDay').invalid && this.webPageSourceForm.get('consultDateDay').touched;
  }

  get consultDateMonthValid() {
    return this.webPageSourceForm.get('consultDateMonth').valid && this.webPageSourceForm.get('consultDateMonth').touched;
  }

  get consultDateMonthInvalid() {
    return this.webPageSourceForm.get('consultDateMonth').invalid && this.webPageSourceForm.get('consultDateMonth').touched;
  }

  get consultDateYearValid() {
    return this.webPageSourceForm.get('consultDateYear').valid && this.webPageSourceForm.get('consultDateYear').touched;
  }

  get consultDateYearInvalid() {
    return this.webPageSourceForm.get('consultDateYear').invalid && this.webPageSourceForm.get('consultDateYear').touched;
  }

}
