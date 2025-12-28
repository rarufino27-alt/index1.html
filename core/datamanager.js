/* ===============================
   DATA MANAGER — RF DRIVER
   CONTRATO ESTÁVEL (ARRAY SAFE)
================================ */

window.DataManager = (function () {

  const DATA_URL = "/data/precos.json";
  let cache = null;

  async function carregar() {
    if (cache) return cache;

    try {
      const res = await fetch(DATA_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Falha ao carregar precos.json");

      cache = await res.json();
      return cache;

    } catch (err) {
      console.error("❌ Erro ao carregar /data/precos.json", err);
      cache = {};
      return cache;
    }
  }

  async function listarOrigens() {
    const data = await carregar();
    return Object.keys(data).sort();
  }

  async function listarDestinos(origem) {
    const data = await carregar();
    const lista = data[origem];

    if (!Array.isArray(lista)) return [];

    return lista
      .map(item => item.destino)
      .filter(Boolean)
      .sort();
  }

  async function obterValor(origem, destino) {
    const data = await carregar();
    const lista = data[origem];

    if (!Array.isArray(lista)) return 0;

    const encontrado = lista.find(item => item.destino === destino);
    return encontrado ? Number(encontrado.valor) : 0;
  }

  return {
    listarOrigens,
    listarDestinos,
    obterValor
  };

})();
