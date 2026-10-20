# Lista de Convidados

## Tecnologias

- JavaScript
- React
- .NET
- PostgreSQL

## Configuracao local

### Frontend

Copie `client/.env.example` para `client/.env` e ajuste a URL da API se necessario.

```bash
cd client
npm install
npm run dev
```

A imagem de compartilhamento dos convites e `client/public/previaSEO.png`.
O build gera as tags Open Graph e Twitter diretamente no HTML, inclusive para os
links `/confirmacao/:token`. Na Vercel, mantenha o acesso as variaveis de sistema
habilitado para detectar o dominio automaticamente. Para definir outro dominio,
configure `VITE_SITE_URL` com a URL publica do frontend e faca um novo deploy.

### Backend

Copie `api/appsettings.Development.example.json` para `api/appsettings.Development.json` e ajuste a string de conexao do PostgreSQL.

```bash
cd api
dotnet restore
dotnet run
```


