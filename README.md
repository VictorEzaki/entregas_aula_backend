# 💰 Expense API - Sistema de Gestão de Despesas

## 1.1. Descrição do projeto

### Objetivo da API
O objetivo desta API é fornecer uma interface de backend robusta para o controle financeiro pessoal. O sistema permite que o usuário registre seus gastos diários, organize-os por categorias e obtenha relatórios consolidados de despesas totais e agrupadas, facilitando a tomada de decisão sobre o orçamento pessoal.

### Tecnologias usadas
* **Node.js**: Ambiente de execução para o servidor.
* **Express.js**: Framework minimalista para criação de rotas e middlewares.
* **FileSystem (fs)**: Módulo nativo para persistência de dados em arquivos locais (JSON).
* **JavaScript (ES6+)**: Utilização de métodos modernos como `.reduce()`, `.filter()` e `.find()`.

---

## 1.2. Como executar o projeto

Certifique-se de que possui o Node.js instalado em sua máquina.

1. Instale as dependências do projeto:
```bash
npm install
```
2. Inicie o servidor:
```bash
node app.js
```


O servidor está rodando em ```http://localhost:3000```

## 1.3. Modelo de dados

A entidade Expense representa uma movimentação financeira e possui a seguinte estrutura:

- **id (Number)**: Identificador único numérico (gerado automaticamente).  
- **title (String)**: Nome identificador da despesa.  
- **amount (Number)**: Valor financeiro da despesa.  
- **category (String)**: Categoria da despesa (ex: Alimentação, Lazer).  
- **date (String)**: Data da ocorrência no formato YYYY-MM-DD.  
- **description (String)**: Detalhes adicionais sobre o gasto.  
- **createdAt (String)**: Data e hora em que o registro foi criado no sistema (gerado automaticamente).  

---

## 1.4. Rotas e exemplos de requisições

### Criação de Despesa (POST)
**Endpoint:** `/expense/new`

**Payload:**
```json
{
  "title": "Netflix",
  "amount": 50.20,
  "category": "Assinatura",
  "date": "2026-03-20",
  "description": "Assinatura da netflix"
}
```

### Listagem de despesas e seus filtros (GET)
**Endpoint:** `/expenses/list`
**Endpoint com filtro de categoria:** `/expenses/list?category=comida`
**Endpoint com filtro de data:** `/expenses/list?date=2026-03-01`

**Resposta (Exemplo):**
```json
[
    {
        "id": 1,
        "title": "Supermercado",
        "amount": 450.5,
        "category": "comida",
        "date": "2026-03-01",
        "description": "Compras mensais",
        "createdAt": "2026-03-01T10:00:00.000Z"
    },
]
```

### Busca de despesa por ID (GET)
**Endpoint:** `/expenses/list/1`

**Resposta (Exemplo):**
```json
{
    "id": 1,
    "title": "Supermercado",
    "amount": 450.5,
    "category": "comida",
    "date": "2026-03-01",
    "description": "Compras mensais",
    "createdAt": "2026-03-01T10:00:00.000Z"
}

```

### Edição de despesa (DELETE)
**Endpoint:** `/expenses/edit/1`

**Payload:**
```json
{
  "title": "Disney Plus",
  "amount": 30,
  "category": "Assinatura",
  "date": "2026-03-20",
  "description": "Assinatura da Disney Plus"
}
```

### Edição de despesa (PUT)
**Endpoint:** `/expenses/delete/1`

### Resumo Total Geral (GET)

**Endpoint:** `/expense/summary/total`

**Resposta:**
```json
{
  "total": 665.40
}
```

### Resumo por Categoria (GET)

**Endpoint:** `/expense/summary/category`

**Resposta:**
```json
{
  "Contas Fixas": 215.40,
  "Alimentação": 450.00
}
```

**Deixei o arquivo ``expense_api.postman.json`` no repositório caso queira importar para o seu postman para testes das rotas.**