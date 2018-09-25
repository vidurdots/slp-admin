import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
	heading:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.params.subscribe(params => { this.heading = params['slug']; } );
  }

}
