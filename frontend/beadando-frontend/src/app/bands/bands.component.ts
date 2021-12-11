import { Component, OnInit } from '@angular/core';
import { Bands } from 'src/app/bands';
import { DataService } from '../service/data.service';
import { FormControl, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {


  bands: Bands[] = []

  name=['dArtagnan','The Killers','Five Finger Death Punch','Powerwolf','Tortuga','ABBA']
  genre = ['Rock', 'Pop', 'Metal', 'Country', 'Alternative','Classic']
  members = ['1', '2', '3', '4', '5', '6', '7', '8']
  formation = Array(2021 - (2021 - 200)).fill('').map((v, idx) => (2021 - idx) + '')

  newband = { name: '', memberNr: '' , genre: '', formationY: ''}


 
    showForm = false

 
    save = false
    update = false


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getBands()
  }

  getBands(){
    this.bands = []
    this.showNotFoundMessage = false
    this.dataService.getBand().subscribe(values => this.setBands(values as Bands[]))
  }

  setBands(values: Bands[]) {
    values.forEach(element => {
      this.bands.push(element)
    });

  }

  errors() {
    if(!this.newband.name || !this.newband.formationY || !this.newband.genre || this.newband.memberNr) {
      return true;
    }
    return false;
  }


  addNew() {
    this.newband = {} as Bands
    this.update = false
    this.save = true
    this.showForm = true
  }

  currentBand : Bands = {} as Bands


  updateBand(band: Bands) {
    this.save = false
    this.currentBand = band

    this.newband.name = band.name
    this.newband.genre = band.genre
    this.newband.formationY = band.formationY
    this.newband.memberNr = band.memberNr
    

    this.update = true
    this.showForm = true
  }


  saveOrUpdate() {
    if(this.update) {
      if ( 
          this.currentBand.genre == this.newband.genre &&
          this.currentBand.memberNr == this.newband.memberNr && 
          this.currentBand.formationY == this.newband.formationY && 
          this.currentBand.name != this.newband.name
        ) 
      {
        this.dataService.updateBandName(this.newband.name, this.currentBand.id).subscribe(response => this.getBands())
      }
      else {
        this.dataService.updateBand(this.newband, this.currentBand.id).subscribe(response => this.getBands())
      }
      this.update = false
    }

    if(this.save) {
      this.dataService.addBand(this.newband).subscribe(response => this.getBands())
    }

    this.save = false
    this.showForm = false;
  }

  deleteBand(id: string) {
    this.dataService.deleteBand(id).subscribe(response => this.getBands())
  }

  searchedID = null
  showNotFoundMessage = false


  searchOne() {
    this.showNotFoundMessage = false
    let id = this.searchedID
    this.searchedID = null
    this.dataService.getBandById(id + '')
      .subscribe(
        (response) => {
          this.bands = []
          this.bands.push(response as Bands)
        },
        (error) => {
          this.showNotFoundMessage = true
          this.bands = []
        }
      )
  }

}
