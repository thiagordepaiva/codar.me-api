# Instalando Dependencias

```bash
yarn
```

# Subindo Servidor BackEnd

```bash
yarn dev
```

# Criando Docker do banco de Dados

```bash
docker-compose up -d
```

# Criando uma migration

```bash
yarn prisma migrate
```

# Rodando migrations Prisma

```bash
yarn db:migrate
```

# Subindo IDE Banco de Dados

```bash
yarn prisma studio
```

# Criando Diagrama de Entidade do Banco de Dados

- Gera o Arquivo ERD.svg com a imagem do Diagrama do banco de Dados, dentro do diretorio ./prisma/ERD.svg

```bash
yarn prisma generate
```

# Executar o Seed no Banco

-Criação de registro ficticios para auxilio em teste de implementações, dentro do diretorio ./prisma/seed.ts

```bash
yarn prisma db seed
```

# Rodando Testes

-Para Rodar os testes basta executar no terminal

```bash
yarn teste
```

-Caso queira executar o teste de uma unica suite basta colocar após o comando o nome do arquivo

```bash
yarn teste src/routes.test.js
```

-Caso queira executar somente um teste de uma suite(arquivo) adicionar um only ao teste

```bash
it.only(deveria ...
```
