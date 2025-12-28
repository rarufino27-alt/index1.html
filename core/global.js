/* =========================================================
   GLOBAL.JS — NÚCLEO DO APP RF DRIVER
   Fonte única de ESTADO e CONTROLE
========================================================= */

(function () {
  const STORAGE_KEY = "rf_driver_app_state";

  const defaultState = {
    origem: null,
    destino: null,
    valorBase: 0,

    taxas: {
      feira: false,
      excessoPessoas: false,
      animal: null, // pequeno | medio | grande
      cancelamento: false,
      buscaLonge: false
    }
  };

  const App = {
    state: { ...defaultState },

    /* --------- INIT --------- */
    init() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          this.state = JSON.parse(saved);
        } catch {
          this.reset();
        }
      }
      console.info("✅ App inicializado", this.state);
    },

    /* --------- STATE --------- */
    set(key, value) {
      this.state[key] = value;
      this.persist();
    },

    setTaxa(nome, valor) {
      this.state.taxas[nome] = valor;
      this.persist();
    },

    get(key) {
      return this.state[key];
    },

    getTaxa(nome) {
      return this.state.taxas[nome];
    },

    /* --------- STORAGE --------- */
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    },

    reset() {
      this.state = { ...defaultState };
      this.persist();
    },

    /* --------- NAV --------- */
    go(page) {
      window.location.href = page;
    }
  };

  // expõe globalmente
  window.App = App;
  App.init();
})();
