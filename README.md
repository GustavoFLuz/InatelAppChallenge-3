# Medidor de Tráfego de Rede
### Inatel App Challenge 2023

Esse projeto faz parte do Inatel App Challenge 2023, um hackathon de uma semana cujo objetivo dessa edição foi desenvolver uma aplicação desktop que forneça ao usuário a capacidade de visualização do uso de como seus dados estão sendo consumidos

Para utilização da aplicação é necessário a instalação e execução prévia de um back end fornecido em [Viasat-NetworkTrafficMeter](https://github.com/Viasat/Viasat-NetworkTrafficMeter)

## Descrição do Projeto

Essa aplicação consiste em três interfaces principais, para visualização dos processos, protocolos e hosts, sendo que cada um contém gráficos e listas para facilitar o entendimento do consumo.

É possível também, pelo menu de configuração, ajustar um limite de dados, que, caso os consumo total ou por aplicação o alcance, será enviada uma notifição pelo próprio aplicativo alertando o usuário. 

Além disso, é possível também exportar os dados em um arquivo no formato csv, seja por processo ou os dados totais, com a finalizade de utilizar alguma ferramenta externa ou encaminhar a uma pessoa especializada que possa entender melhor do assunto.

## Instalação

Primeiramente, instale o NodeJs, versão 18.05: [NodeJs](https://nodejs.org/en), e Python na versão 3.10: [Python](https://www.python.org/)

Acesse o repositório [NetworkTrafficMeter](https://github.com/Viasat/Viasat-NetworkTrafficMeter), clone e execute os seguintes comandos no terminal:
```
python.exe traffic_analyzer_v2.py

```

Em seguida, clone esse repositório e execute os seguintes comandos no terminal:
```
npm i

npm run dev

```

A aplicação deve abrir logo em seguida.

> Foi planejado também uma build pronta para distribuição com Electron-Forge, no entando ela não foi devidamente finalizada e testada
