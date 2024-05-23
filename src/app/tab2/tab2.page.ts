import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cep: string | undefined;
  endereco: any = {};

  constructor(private http: HttpClient) {}

  buscarEndereco() {
    if (this.cep) {
      const cep = this.cep.replace(/\D/g, '');
      if (cep.length === 8) {
        this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(data => {
          if (!data.erro) {
            this.endereco = data;
          } else {
            alert('CEP não encontrado.');
            this.endereco = {};
          }
        }, error => {
          alert('Erro ao buscar o CEP.');
          console.error(error);
          this.endereco = {};
        });
      } else {
        alert('CEP inválido.');
        this.endereco = {};
      }
    }
  }
}