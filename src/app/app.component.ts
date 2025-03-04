import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe'; 

interface Projeto {
  id: number;
  nome: string;
  financiador: string;
  area: string;
  coordenador: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  ativo: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  projetos: Projeto[] = [
    { id: 1, nome: 'Projeto X', financiador: 'Empresa A', area: 'Construção Civil', coordenador: 'José', 
      vigenciaInicio: '01/01/2024', vigenciaFim: '01/01/2025', ativo: true },
      
    { id: 2, nome: 'Projeto Y', financiador: 'Empresa B', area: 'Tecnologia', coordenador: 'Maria', 
      vigenciaInicio: '01/02/2024', vigenciaFim: '01/02/2025', ativo: false }
  ];
  
  projetoDetalhado: Projeto | null = null;
  projetoSelecionado: Projeto | null = null;
  modoEdicao: boolean = false;
  modoCadastro: boolean = false;
  pesquisa: string = '';

  novoProjeto: Projeto = this.criarNovoProjeto();

  criarNovoProjeto(): Projeto {
    return {
      id: 0,
      nome: '',
      financiador: '',
      area: '',
      coordenador: '',
      vigenciaInicio: '',
      vigenciaFim: '',
      ativo: true
    };
  }

  exibirDetalhes(projeto: Projeto) {
    this.projetoDetalhado = projeto;
  }

  fecharDetalhes() {
    this.projetoDetalhado = null;
  }

  abrirCadastro() {
    this.modoCadastro = true;
    this.novoProjeto = this.criarNovoProjeto();
  }

  salvarProjeto() {
    if (this.modoEdicao && this.projetoSelecionado) {
      Object.assign(this.projetoSelecionado, this.novoProjeto);
    } else {
      this.novoProjeto.id = this.projetos.length + 1;
      this.projetos.push({ ...this.novoProjeto });
    }
    this.fecharModais();
  }

  editarProjeto(projeto: Projeto) {
    this.modoEdicao = true;
    this.projetoSelecionado = projeto;
    this.novoProjeto = { ...projeto };
  }

  excluirProjeto(projeto: Projeto) {
    if (confirm(`Tem certeza que deseja excluir o projeto "${projeto.nome}"?`)) {
      this.projetos = this.projetos.filter(p => p.id !== projeto.id);
    }
  }

  alterarStatusProjeto(projeto: Projeto) {
    if (confirm(`Deseja realmente ${projeto.ativo ? 'desativar' : 'ativar'} o projeto "${projeto.nome}"?`)) {
      projeto.ativo = !projeto.ativo;
    }
  }

  fecharModais() {
    this.modoCadastro = false;
    this.modoEdicao = false;
    this.projetoSelecionado = null;
  }
}
