import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  public innerWidth: any;

  constructor(private titlepage:Title) { }

  ngOnInit(): void {
    this.titlepage.setTitle('Contacto')
    this.innerWidth = window.innerWidth;
    }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  }
}
