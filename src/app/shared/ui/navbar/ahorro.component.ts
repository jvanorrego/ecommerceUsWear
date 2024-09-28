import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.html',
  styleUrls: ['./ahorro.component.scss']
})
export class AhorroComponent implements OnInit {
  ahorroCo2: number = 0;
  ahorroAgua: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/calculo_ahorro').subscribe(data => {
      this.ahorroCo2 = data.ahorro_co2;
      this.ahorroAgua = data.ahorro_agua;
    });
  }
}

