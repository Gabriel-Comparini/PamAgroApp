# PamAgroApp

Este é um app em React Native com Expo que demonstra o uso de recursos nativos do celular: contatos, localização, câmera/galeria, sensores e um formulário que junta tudo.

## Funcionalidades

- **Contatos:** lista os contatos do dispositivo com busca por nome, mostrando telefone e e-mail.
- **Localização:** mostra a latitude e longitude atual do dispositivo.
- **Galeria:** tira foto com a câmera ou escolhe uma imagem da galeria. A última imagem fica salva no aparelho.
- **Sensores:** mostra em tempo real os valores do acelerômetro (x, y, z) e do giroscópio. Exibe um alerta se o acelerômetro passar de 2.0g.
- **Formulário:** junta nome, foto, localização e acelerômetro em um registro. Os registros ficam salvos no histórico local, onde é possível excluir um item ou limpar tudo.

## Tecnologias

- React Native
- Expo (SDK 57)
- TypeScript
- React Navigation (native-stack)
- expo-contacts, expo-location, expo-image-picker, expo-sensors
- AsyncStorage para salvamento local
- lucide-react-native para os ícones

## Pré-requisitos

- Node.js
- npm
- App Expo Go no celular (para testar) ou emulador Android / simulador iOS

## Como rodar

1. Instale as dependências:

```
npm install
```

2. Inicie o projeto:

```
npm start
```

3. Escaneie o QR Code com o app Expo Go ou aperte `a` para Android, `i` para iOS e `w` para web.

## Permissões usadas

O app pede permissão na hora de usar cada recurso:

- Contatos
- Localização em primeiro plano
- Câmera e galeria

## Estrutura

```
App.tsx               -> rotas do app
src/screens/          -> telas (MainMenu, ContactScreen, LocationScreen, GalleryScreen, SensorScreen, FormScreen)
src/components/       -> componentes reutilizáveis (ContentBody)
```
