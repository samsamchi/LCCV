import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjetoService {
  private apiUrl = 'https://sume.lccv.ufal.br/homologacao/api/selecao_5_2025/projetos';

  constructor(private http: HttpClient) {}

  listarProjetos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar/`);
  }

  obterFormulario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/form/`);
  }

  visualizarProjeto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/visualizar/`);
  }

  cadastrarProjeto(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar/`, dados);
  }

  editarProjeto(id: number, dados: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/editar/`, dados);
  }

  ativarProjeto(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/ativar/`, {});
  }

  inativarProjeto(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/inativar/`, {});
  }
}
