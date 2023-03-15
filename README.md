## Instalando Dependencias
```bash
yarn
```

## Subindo Servidor BackEnd
```bash
yarn dev
```

## Criando Docker do banco de Dados
```bash
docker-compose up -d
```

## Criando uma migration
```bash
yarn prisma migrate
```

## Rodando migrations Prisma
```bash
yarn prisma migrate dev --preview-feature
```

## Subindo IDE Banco de Dados
```bash
yarn prisma studio
```

## Criando Diagrama de Entidade do Banco de Dados
- Gera o Arquivo ERD.svg com a imagem do Diagrama do banco de Dados, dentro do diretorio ./prisma/ERD.svg
```bash
yarn prisma generate
```

## Executar o Seed no Banco 
-Criação de registro ficticios para auxilio em teste de implementações, dentro do diretorio ./prisma/seed.ts
```bash
yarn prisma db seed
```
