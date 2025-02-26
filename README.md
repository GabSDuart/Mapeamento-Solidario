# Mapeamento-Solidário

Projeto de extensão para a disciplina de Programação Para Dispositivos Móveis Em Android - Faculdade Estácio de Sá - MAR/2025

Descrição

O Mapeamento Solidário é um aplicativo mobile desenvolvido em React Native, Kotlin e Java, com integração à Google Maps API, permitindo o mapeamento de pontos de aglomeração de moradores de rua e a localização de abrigos públicos disponíveis. O objetivo do app é fornecer uma ferramenta eficiente para agentes da prefeitura e ONGs cadastradas monitorarem e auxiliarem a população em situação de vulnerabilidade.

Tecnologias Utilizadas

Frontend: React Native
Backend: Kotlin + Java (Spring Boot)
Banco de Dados: PostgreSQL (pela confiabilidade, suporte a dados geoespaciais e escalabilidade)
APIs: Google Maps API (para geolocalização e exibição no mapa)

Principais Funcionalidades

✅ Login e cadastro de usuários autenticados (prefeitura e ONGs)

✅ Exibição de mapa interativo com pontos cadastrados

✅ Registro de novos pontos de aglomeração de moradores de rua

✅ Consulta e gerenciamento de abrigos públicos disponíveis

✅ Segurança reforçada com autenticação JWT

Como executar:

1. Clone este repositório
  git clone https://github.com/seu-usuario/MapeamentoSolidario.git
  cd MapeamentoSolidario
  
2. Insale as dependências
  npm install

3. Inicie o servidor backend (Kotlin + Spring Boot)
  ./gradlew bootRun

4. Inicie o front
   npx expo start



Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias no projeto.

Licença
MIT License.
