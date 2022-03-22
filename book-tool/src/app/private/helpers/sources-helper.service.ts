import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Author, Source, SourceType } from '../interfaces/sources.interface';

@Injectable({
  providedIn: 'root'
})
export class SourcesHelperService {

  public authorArr: Author[] = [];

  constructor( private _angularFirestore: AngularFirestore ){ }

  setData(type: SourceType, form: FormGroup):Source {

    let arrTemp = form.get('authors').value;
    let itsUnknowAuthor = form.get('itsUnknowAuthor').value;

    switch (type) {

      case 'webpage':

        this.authorArr = [];

        if (!itsUnknowAuthor) {
          for (let i = 0; i < arrTemp.length; i++) {

            let author: Author = {
              initials: arrTemp[i].authorInitials,
              lastName: arrTemp[i].authorLastName,
              organization: arrTemp[i].organization || ''
            }

            this.authorArr.push(author);
          }
        } else {
          let author: Author = {
            initials: '',
            lastName: 'Desconocido',
            organization: ''
          }

          this.authorArr.push(author);
        }

        const dataWebpage: Source = {
          sid: this._angularFirestore.createId(),
          sourceType: type,
          authors: this.authorArr,
          publicationDate: {
            day: form.get('publishDateDay').value,
            month: form.get('publishDateMonth').value,
            year: form.get('publishDateYear').value
          },
          consultDate: {
            day: form.get('consultDateDay').value,
            month: form.get('consultDateMonth').value,
            year: form.get('consultDateYear').value
          },
          webPageTitle: form.get('webPageTitle').value,
          webPageUrl: form.get('webPageUrl').value,
          websiteName: form.get('websiteName').value
        }

        return dataWebpage;

      // ********************************************************* //

      case 'book':

      this.authorArr = [];

        if (!itsUnknowAuthor) {
          for (let i = 0; i < arrTemp.length; i++) {

            let author: Author = {
              initials: arrTemp[i].authorInitials,
              lastName: arrTemp[i].authorLastName,
              organization: arrTemp[i].organization || ''
            }

            this.authorArr.push(author);
          }
        } else {
          let author: Author = {
            initials: '',
            lastName: 'Desconocido',
            organization: ''
          }

          this.authorArr.push(author);
        }

        const dataBook: Source = {
          sid: this._angularFirestore.createId(),
          sourceType: type,
          authors: this.authorArr,
          publicationDate: {
            year: form.get('publishDateYear').value
          },
          bookTitle: form.get('bookTitle').value,
          editorialName: form.get('editorialName').value,
          bookSourceDoi: form.get('bookSourceDoi').value,
          bookSourceUrl: form.get('bookSourceUrl').value
        }

        return dataBook;

      // ********************************************************* //

      default:
        break;
    }

  }

}
