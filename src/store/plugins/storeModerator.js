export default function configureModerator(store, router) {
  store.subscribe(({ type, payload }, state) => {
    switch (type) {
      default: return state;
    }
  });

  store.subscribeAction(({ type, payload }, state) => {
    switch (type) {
      default: return state;
    }
  });
}
