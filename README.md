# Desafio / Teste Node

Problemática:

Crie uma página que receba uma URL para um site qualquer (exemplo: "www.google.com.br"). 

Feito isso, extraia todas as imagens do link em questão via back-end e armazene-as em um diretório qualquer.

Armazene o link da página e o caminho de cada imagem baixada em um banco de dados e exiba na tela miniaturas destas imagens.

## Resultado

![GIF 16-07-2020 17-02-39](https://user-images.githubusercontent.com/35817813/87717728-4035c700-c787-11ea-8202-7cdb1199b42d.gif)



## BACKEND (API)


✔️ Buscar imagens na url

✔️ Salvar url imagens no banco

✔️ Baixar image e salvar em diretório local

✔️  Opção para substituir/atualizar se a url já existir

✔️ Adicionar socket.io


## FRONTEND (VUE JS + TAILWIND.CSS)

✔️ Criar pagina

✔️ Gerenciar estado

✔️ Conectar web sockets

❌ Loadings...


## Considerações ##

- A api foi desenvolvida utilizando os conceitos de TDD, SOLID e DDD e alguns padrões de projeto.
- Facilidade para refactors ou adicionar novas features
- A api recebe uma url no corpo (método post).
- Dado a url é feito um web scraping na página fornecida e é filtrado todas as tags imgs.
- O atributo src da tag img é baixado e salvo na pasta images na raiz do projeto.
- Após baixado o endereço local das imagens é enviada para o Mongo.
- Se já houver a mesma url no banco e uma nova requisição for feita, ocorre uma atualização nas imagens.


## Executando o projeto ##

- Clone o repositório
- Instale as dependências através do npm (npm install)
- Execute o comando npm start na raiz do projeto

- API - END POINTS: 


  (GET) http://localhost:5050/PATH_DA_IMAGENS => Exibe a imagem
  
  
  (POST) http://localhost:5050/imageFromUrl =>  Realiza o download das imagens
  
    Exemplo de body: 
	    {
		    "url": "https://www.google.com/"
	    }
    
    
  (GET) http://localhost:5050/imageFromUrl => Retorna todas as urls já salvas

  

## Scripts
  #BACKEND
  npm run start (executa o servidor)
  
  npm run test:unit ( executa os testes unitários)
  
  #FRONTEND
  npm install
  npm run serve
