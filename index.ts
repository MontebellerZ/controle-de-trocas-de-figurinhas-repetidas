import REPETIDAS from "./repetidas.json";

class Troca {
  nome: string;
  enviar: string[];
  receber: string[];

  constructor(nome: string, receber: (number | string)[], enviar: (number | string)[]) {
    this.nome = nome;
    this.enviar = enviar.map(String);
    this.receber = receber.map(String);
  }
}
type Sobra = { nome1: string; nome2: string; sobra: string[] };
type Falta = { nome: string; falta: string[] };

const TROCAS: Troca[] = [
  new Troca("herciliafc", [52, 54, 140, 190, 193], [96, 98, 149, 160, 187]),
  new Troca(
    "leticia333",
    [
      32,
      36,
      40,
      55,
      63,
      71,
      80,
      83,
      87,
      91,
      97,
      103,
      105,
      136,
      138,
      152,
      170,
      188,
      189,
      "HK4",
      "HK6",
      "HK17",
      "HK19",
    ],
    []
  ),
  new Troca("caroldot", [17, 38, 47, 75, 157, 182, "HK20"], []),
  new Troca("kspimenta", [], [78]),
  new Troca("joabedutra", [48, 81, 89, 175, "HK5"], [176]),
  new Troca("raquelang", [18, 124, 185], [28, 78, 112]),
];

function novasSobrando() {
  const sobrasTotal: Sobra[] = [];

  for (let i = 0; i < TROCAS.length; i++) {
    const t1 = TROCAS[i];

    for (let j = i + 1; j < TROCAS.length; j++) {
      const t2 = TROCAS[j];

      const sobras = t1.receber.filter((fig) => t2.receber.includes(fig));

      if (sobras.length) sobrasTotal.push({ nome1: t1.nome, nome2: t2.nome, sobra: sobras });
    }
  }

  return sobrasTotal;
}

function repetidasFaltando() {
  const repetidas = [...REPETIDAS];
  const faltamTotal: Falta[] = [];

  for (const troca of TROCAS) {
    const faltam: string[] = [];

    for (const fig of troca.enviar) {
      const id = repetidas.indexOf(fig);
      if (id === -1) faltam.push(fig);
      repetidas.splice(id, 1);
    }

    if (faltam.length) faltamTotal.push({ nome: troca.nome, falta: faltam });
  }

  return faltamTotal;
}

function main() {
  const sobras = novasSobrando();
  const faltam = repetidasFaltando();

  console.log("sobras", sobras);
  console.log("faltam", faltam);
}

main();
