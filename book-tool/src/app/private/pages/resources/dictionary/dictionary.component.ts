import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Term } from "../../../interfaces/dictionary.term.interface";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  public termToSearch:string = '';
  public term:Term = { };

  public dictionaryForm: FormGroup = this._formBuilder.group({
    termToSearch: ['', Validators.required]
  });

  constructor( 
    private _formBuilder: FormBuilder 
    ) { }

  ngOnInit(): void { }

  searchTerm(){
    this.termToSearch = this.dictionaryForm.get('termToSearch').value;
    const urlChar = this.termToSearch.charAt(0);
    
    let url = `bpdata/es_dictionarie/${ urlChar }/${ this.termToSearch }`;

    this.term = {};
    console.log('Esto trae la url: ', url);
    
  }

}
